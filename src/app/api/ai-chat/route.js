import { NextResponse } from 'next/server';
import helpData from '../../data/helpData.json';

// Knowledge base from help center articles
const createKnowledgeBase = () => {
  const knowledge = [];
  
  helpData.articles.forEach(article => {
    const articleInfo = {
      id: article.id,
      title: article.title,
      content: article.note || '',
      steps: article.steps || [],
      relatedLinks: article.relatedLinks || []
    };
    
    // Create searchable content
    const searchableContent = [
      article.title,
      article.note || '',
      ...(article.steps || []),
    ].join(' ').toLowerCase();
    
    knowledge.push({
      ...articleInfo,
      searchableContent
    });
  });
  
  return knowledge;
};

// Simple keyword matching for responses
const findRelevantArticles = (query, knowledgeBase) => {
  const queryLower = query.toLowerCase();
  const relevantArticles = [];
  
  knowledgeBase.forEach(article => {
    const score = calculateRelevanceScore(queryLower, article.searchableContent, article.title);
    if (score > 0) {
      relevantArticles.push({ ...article, score });
    }
  });
  
  return relevantArticles.sort((a, b) => b.score - a.score).slice(0, 3);
};

const calculateRelevanceScore = (query, content, title) => {
  let score = 0;
  const queryWords = query.split(' ').filter(word => word.length > 2); // Filter out short words
  
  // Intent-based scoring
  const isCreationQuestion = query.includes('how to create') || query.includes('how can i create') || query.includes('create visual') || query === 'create visual';
  const isPublishingQuestion = query.includes('how to publish') || query.includes('publish') || query.includes('make public');
  const isDefinitionQuestion = query.includes('what is') || query.includes('what are');
  
  // Title matches get higher score
  queryWords.forEach(word => {
    if (title.toLowerCase().includes(word)) score += 3;
    if (content.includes(word)) score += 1;
  });
  
  // Exact phrase matches
  if (content.includes(query)) score += 5;
  if (title.toLowerCase().includes(query)) score += 10;
  
  // Intent-based scoring adjustments
  if (isCreationQuestion && (title.toLowerCase().includes('camera') || title.toLowerCase().includes('upload'))) {
    score += 15; // Prioritize creation-related articles
  }
  
  // For creation questions, heavily favor the customization article since it contains the complete visual creation process
  if (isCreationQuestion && title.toLowerCase().includes('customize')) {
    score += 50; // Heavily favor the customization article for creation questions
  }
  
  // Penalize camera mode articles for creation questions since customization article is more comprehensive
  if (isCreationQuestion && title.toLowerCase().includes('camera') && !title.toLowerCase().includes('customize')) {
    score -= 10; // Reduce score for basic camera mode articles when asking about creation
  }
  
  if (isPublishingQuestion && title.toLowerCase().includes('publish')) {
    score += 15; // Prioritize publishing articles
  }
  
  if (isDefinitionQuestion && (title.toLowerCase().includes('what is') || title.toLowerCase().includes('about'))) {
    score += 12; // Prioritize definition articles
  }
  
  // Penalize wrong intent matches
  if (isCreationQuestion && title.toLowerCase().includes('publish')) {
    score -= 10; // Reduce score for publishing articles when asking about creation
  }
  
  if (isPublishingQuestion && title.toLowerCase().includes('create') && !title.toLowerCase().includes('publish')) {
    score -= 10; // Reduce score for creation articles when asking about publishing
  }
  
  // Heavily penalize account creation articles when asking about visual creation
  if (isCreationQuestion && title.toLowerCase().includes('account')) {
    score -= 50; // Heavily penalize account articles when asking about visual creation
  }
  
  // Heavily penalize right menu articles when asking for contact support
  const isContactRequest = queryLower.includes('connect me') || 
                          queryLower.includes('contact support') || 
                          queryLower.includes('contact us') ||
                          queryLower.includes('support team') ||
                          queryLower === 'connect me' ||
                          queryLower === 'contact' ||
                          queryLower === 'support';
  
  if (isContactRequest && (title.toLowerCase().includes('right menu') || title.toLowerCase().includes('cinema mode'))) {
    score -= 50; // Heavily penalize right menu articles when asking for contact support
  }
  
  return score;
};

const generateResponse = (query, relevantArticles) => {
  if (relevantArticles.length === 0) {
    return {
      response: "I couldn't find specific information about that topic in our help center. Our support team would be happy to help you with this question. Would you like me to connect you with them?",
      needsContact: true
    };
  }
  
  const bestMatch = relevantArticles[0];
  let response = `Based on our help center, here's what I found about "${bestMatch.title}":\n\n`;
  
  if (bestMatch.content) {
    response += bestMatch.content + '\n\n';
  }
  
  if (bestMatch.steps && bestMatch.steps.length > 0) {
    response += 'Here are the steps:\n';
    bestMatch.steps.forEach((step, index) => {
      response += `${index + 1}. ${step}\n`;
    });
    response += '\n';
  }
  
  if (relevantArticles.length > 1) {
    response += 'Related topics that might help:\n';
    relevantArticles.slice(1).forEach(article => {
      response += `• ${article.title}\n`;
    });
    response += '\n';
  }
  
  response += 'Was this helpful? If you need more specific assistance, I can connect you with our support team.';
  
  return {
    response,
    needsContact: false
  };
};

// Handle common questions with specific responses
const handleCommonQuestions = (query) => {
  const queryLower = query.toLowerCase();
  
  if (queryLower.includes('what is privee') || queryLower.includes('about privee')) {
    return {
      response: `Privee is a platform where you can watch and create immersive cinematic video content. Here are the key features:\n\n• Upload up to 33 videos each month for free\n• Visual (Video) can be up to 12 seconds long\n• Subscribe for unlimited uploads and videos up to 60 seconds\n• Create thematic movies by grouping visuals together\n• Share content with friends and the community\n\nWould you like to know more about any specific feature?`,
      needsContact: false
    };
  }
  
  
  if (queryLower.includes('how to create') || queryLower.includes('how to make')) {
    return {
      response: `To create content in Privee:\n\n1. Open Camera Mode (swipe left from Cinema Screen)\n2. Record a new video or upload from your device\n3. Tap "Done" when ready\n4. Customize with title, filters, captions, date, or music\n5. Choose an existing Movie or create a new one\n6. Tap "Done" to upload (content goes to Private Profile first)\n\nAll uploads start as private. You can publish them later when ready!\n\nNeed help with any specific step?`,
      needsContact: false
    };
  }
  
  if (queryLower.includes('how to publish') || queryLower.includes('make public') || queryLower.includes('publish visual')) {
    return {
      response: `To publish your visual:\n\n1. Go to your Private Profile\n2. Open the Movie and select the Visual you want to publish\n3. Tap the Play button at the bottom of your screen\n4. Choose "Prepare to Publish"\n5. Tap "Publish"\n\nYour video will then appear in the Cinema for others to see and will be visible in your Public gallery too.\n\nNote: You can have different titles and captions for private vs public versions!`,
      needsContact: false
    };
  }
  
  if (queryLower.includes('cinema screen') || queryLower.includes('what is cinema')) {
    return {
      response: `The Cinema Screen is the heart of Privee - it's the first screen you see when opening the app!\n\nHere's how to use it:\n• Tap left/right to browse different visuals within the same movie\n• Swipe up/down to switch between movies\n• This is where you discover content created by other users\n• You can like, comment, and share content you find here\n\nThe Cinema Screen is your gateway to the Privee community!`,
      needsContact: false
    };
  }
  
  if (queryLower.includes('what is a visual') || queryLower.includes('what is visual')) {
    return {
      response: `A visual is an individual video or photo that can be uploaded on its own in thematic folders (Movies).\n\nKey details:\n• Duration: 3-12 seconds (or up to 60 seconds for subscribers)\n• Can be a video or photo\n• Standalone piece of content\n• Can be published individually or as part of a Movie\n• All uploads start in your Private Profile\n\nThink of visuals as the building blocks that make up your Movies!`,
      needsContact: false
    };
  }
  
  if (queryLower.includes('what is a movie') || queryLower.includes('what is movie')) {
    return {
      response: `A movie in Privee is a collection of visuals (videos/photos) grouped together under a common theme or project.\n\nThink of it as:\n• A thematic folder for your visuals\n• A curated playlist of content\n• A continuous story on a particular theme\n• Your own mini-series\n\nYou can upload many visuals into one Movie to create a cinematic story. Movies help organize your content and tell a bigger story!`,
      needsContact: false
    };
  }
  
  if (queryLower.includes('camera mode') || queryLower.includes('what is camera')) {
    return {
      response: `Camera Mode is where your creativity comes to life in Privee!\n\nTo access it:\n• Swipe left from the Cinema Screen\n\nWhat you can do:\n• Record a new video using your device's camera\n• Upload videos or photos from your device\n• Create and customize your visuals\n\nAll content created in Camera Mode goes to your Private Profile first, so you can perfect it before sharing!`,
      needsContact: false
    };
  }
  
  return null;
};

export async function POST(request) {
  try {
    const { message, conversationHistory } = await request.json();
    
    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    
    const knowledgeBase = createKnowledgeBase();
    
    // Check for specific visual creation questions first
    const queryLower = message.toLowerCase().trim();
    console.log('Query:', queryLower); // Debug log
    
    // More explicit matching for visual creation
    const isVisualCreationQuery = (
      queryLower === 'create visual' ||
      queryLower === 'creating visual' ||
      queryLower === 'how to create visual' ||
      queryLower === 'how can i create visual' ||
      (queryLower.includes('create') && queryLower.includes('visual')) ||
      (queryLower.includes('creating') && queryLower.includes('visual')) ||
      (queryLower.includes('how to') && queryLower.includes('create') && queryLower.includes('visual')) ||
      (queryLower.includes('how can') && queryLower.includes('create') && queryLower.includes('visual'))
    );
    
    // Check for contact/support requests first
    const isContactRequest = (
      queryLower.includes('connect me') ||
      queryLower.includes('contact support') ||
      queryLower.includes('contact us') ||
      queryLower.includes('support team') ||
      queryLower.includes('help me') ||
      queryLower.includes('talk to') ||
      queryLower.includes('speak to') ||
      queryLower.includes('human') ||
      queryLower.includes('agent') ||
      queryLower === 'connect me' ||
      queryLower === 'contact' ||
      queryLower === 'support'
    );
    
    if (isContactRequest) {
      console.log('Matched contact request'); // Debug log
      
      return NextResponse.json({
        response: "I'd be happy to connect you with our support team! 🎧\n\nYou can reach our support team through:\n\n• **Contact Us Page**: Visit our [Contact Us page](/contact-us) for direct assistance\n• **Email**: Send us a detailed message about your question\n• **Response Time**: We typically respond within 24 hours\n\nIs there anything specific you'd like help with? I can provide more details to help our support team assist you better!",
        needsContact: true
      });
    }

    if (isVisualCreationQuery) {
      
      console.log('Matched visual creation query'); // Debug log
      
      // Find the "adding-a-new-visual" article which has the correct creation process
      const visualCreationArticle = knowledgeBase.find(article => 
        article.id === 'adding-a-new-visual'
      );
      
      console.log('Found article:', visualCreationArticle?.title); // Debug log
      
      if (visualCreationArticle) {
        let response = `To create a visual in Privee:\n\n`;
        
        if (visualCreationArticle.content) {
          response += visualCreationArticle.content + '\n\n';
        }
        
        if (visualCreationArticle.steps && visualCreationArticle.steps.length > 0) {
          response += 'Here are the steps:\n';
          visualCreationArticle.steps.forEach((step, index) => {
            response += `${index + 1}. ${step}\n`;
          });
          response += '\n';
        }
        
        response += 'Your visual will be added to the selected Movie and saved to your Private Profile.';
        
        return NextResponse.json({
          response,
          needsContact: false
        });
      }
    }
    
    // Check for common questions
    const commonResponse = handleCommonQuestions(message);
    if (commonResponse) {
      return NextResponse.json(commonResponse);
    }
    
    // Find relevant articles
    const relevantArticles = findRelevantArticles(message, knowledgeBase);
    
    // Generate response
    const response = generateResponse(message, relevantArticles);
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Error processing AI chat:', error);
    return NextResponse.json(
      { 
        response: "I'm sorry, I encountered an error. Please try again or contact our support team for assistance.",
        needsContact: true
      },
      { status: 500 }
    );
  }
}

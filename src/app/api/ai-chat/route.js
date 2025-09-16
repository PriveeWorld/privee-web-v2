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
  const queryWords = query.split(' ');
  
  // Title matches get higher score
  queryWords.forEach(word => {
    if (title.toLowerCase().includes(word)) score += 3;
    if (content.includes(word)) score += 1;
  });
  
  // Exact phrase matches
  if (content.includes(query)) score += 5;
  if (title.toLowerCase().includes(query)) score += 10;
  
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
  
  if (queryLower.includes('how to publish') || queryLower.includes('make public')) {
    return {
      response: `To publish your content:\n\n1. Go to your Private Profile\n2. Open the Movie and select the Visual you want to publish\n3. Tap the Play button\n4. Choose "Prepare to Publish"\n5. Tap "Publish"\n\nYour video will then appear in the Cinema for others to see and will be visible in your Public gallery too.\n\nNote: You can have different titles and captions for private vs public versions!`,
      needsContact: false
    };
  }
  
  if (queryLower.includes('cinema screen') || queryLower.includes('what is cinema')) {
    return {
      response: `The Cinema Screen is the heart of Privee - it's the first screen you see when opening the app!\n\nHere's how to use it:\n• Tap left/right to browse different visuals within the same movie\n• Swipe up/down to switch between movies\n• This is where you discover content created by other users\n• You can like, comment, and share content you find here\n\nThe Cinema Screen is your gateway to the Privee community!`,
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
    
    // Check for common questions first
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

import { NextResponse } from 'next/server';

// In a real application, you would store this in a database
// For now, we'll use a simple in-memory storage (resets on server restart)
let feedbackData = [];

// Helper function to send email notification
async function sendFeedbackEmail(feedbackEntry) {
  try {
    const articleTitle = feedbackEntry.articleId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    const subject = `Help Center Feedback: ${feedbackEntry.rating} for "${articleTitle}"`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3A1772; border-bottom: 2px solid #CD1A70; padding-bottom: 10px;">
          📝 Help Center Feedback
        </h2>
        
        <div style="background-color: ${feedbackEntry.rating === 'Yes' ? '#f0f9ff' : '#fef2f2'}; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: ${feedbackEntry.rating === 'Yes' ? '#059669' : '#dc2626'}; margin-top: 0;">
            ${feedbackEntry.rating === 'Yes' ? '👍 Positive Feedback' : '👎 Negative Feedback'}
          </h3>
          <p style="margin: 0; font-size: 18px; font-weight: bold;">
            Article: ${articleTitle}
          </p>
        </div>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #374151; margin-top: 0;">📋 Feedback Details:</h4>
          <p><strong>Article ID:</strong> ${feedbackEntry.articleId}</p>
          <p><strong>Rating:</strong> ${feedbackEntry.rating}</p>
          <p><strong>Time:</strong> ${new Date(feedbackEntry.timestamp).toLocaleString()}</p>
          ${feedbackEntry.email ? `<p><strong>Contact Email:</strong> ${feedbackEntry.email}</p>` : '<p><strong>Contact Email:</strong> Not provided</p>'}
        </div>
        
        ${feedbackEntry.comment ? `
          <div style="background-color: #fff7ed; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
            <h4 style="color: #92400e; margin-top: 0;">💬 User Comment:</h4>
            <p style="margin: 0; font-style: italic;">"${feedbackEntry.comment}"</p>
          </div>
        ` : ''}
        
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #6b7280;">
            <strong>Next Steps:</strong><br>
            ${feedbackEntry.rating === 'No' 
              ? '• Review the article content for clarity and completeness<br>• Consider adding more detailed explanations<br>• Update based on user feedback' 
              : '• Great job! Keep up the quality content<br>• Consider this article as a template for others'}
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px; margin: 0;">
            This feedback was automatically sent from your Privee Help Center
          </p>
        </div>
      </div>
    `;

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject,
        html,
        text: `Help Center Feedback\n\nArticle: ${articleTitle}\nRating: ${feedbackEntry.rating}\nComment: ${feedbackEntry.comment || 'No comment'}\nContact Email: ${feedbackEntry.email || 'Not provided'}\nTime: ${new Date(feedbackEntry.timestamp).toLocaleString()}`
      }),
    });

    if (response.ok) {
      console.log('Feedback email sent successfully');
    } else {
      console.error('Failed to send feedback email');
    }
  } catch (error) {
    console.error('Error sending feedback email:', error);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { articleId, rating, comment, email, timestamp, userAgent } = body;

    // Validate required fields
    if (!articleId || !rating) {
      return NextResponse.json(
        { error: 'Missing required fields: articleId and rating' },
        { status: 400 }
      );
    }

    // Create feedback entry
    const feedbackEntry = {
      id: Date.now().toString(),
      articleId,
      rating,
      comment: comment || '',
      email: email || '',
      timestamp: timestamp || new Date().toISOString(),
      userAgent: userAgent || ''
    };

    // Store feedback
    feedbackData.push(feedbackEntry);

    // Send email notification
    await sendFeedbackEmail(feedbackEntry);

    console.log('Feedback received:', feedbackEntry);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Feedback submitted successfully',
        id: feedbackEntry.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing feedback:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve feedback analytics
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get('articleId');

    let filteredData = feedbackData;
    
    if (articleId) {
      filteredData = feedbackData.filter(feedback => feedback.articleId === articleId);
    }

    // Calculate basic analytics
    const analytics = {
      total: filteredData.length,
      positive: filteredData.filter(f => f.rating === 'Yes').length,
      negative: filteredData.filter(f => f.rating === 'No').length,
      withComments: filteredData.filter(f => f.comment.trim()).length,
      satisfactionRate: filteredData.length > 0 
        ? (filteredData.filter(f => f.rating === 'Yes').length / filteredData.length * 100).toFixed(1)
        : 0
    };

    return NextResponse.json({
      feedback: filteredData,
      analytics
    });

  } catch (error) {
    console.error('Error retrieving feedback:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

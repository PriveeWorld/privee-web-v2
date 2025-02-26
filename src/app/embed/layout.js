
export default function EmbedLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ 
        margin: 0, 
        padding: 0, 
        overflow: 'hidden',
        width: '100%',
        height: '100vh'
      }}>
        {children}
      </body>
    </html>
  );
}
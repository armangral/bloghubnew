interface RichContentProps {
  content: string;
}

export default function RichContent({ content }: RichContentProps) {
  return (
    <div 
      className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:text-gray-800 prose-code:bg-gray-100 prose-pre:bg-gray-900 prose-blockquote:border-blue-500"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
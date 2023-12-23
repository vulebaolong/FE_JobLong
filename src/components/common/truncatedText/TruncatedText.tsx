function TruncatedText({ children, maxWidth }: { children: React.ReactNode; maxWidth: string }) {
    return (
        <div
            style={{
                maxWidth: maxWidth,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            }}
        >
            {children}
        </div>
    );
}
export default TruncatedText;

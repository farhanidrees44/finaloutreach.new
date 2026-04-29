type Data = Record<string, unknown>

export function JsonLd({ data }: { data: Data | Data[] }) {
  const items = Array.isArray(data) ? data : [data]
  return (
    <>
      {items.map((item, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}

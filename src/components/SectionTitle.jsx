export default function SectionTitle({ eyebrow, title, action }) {
  return <div className="section-heading"><div><span className="eyebrow muted">{eyebrow}</span><h2>{title}</h2></div>{action}</div>
}

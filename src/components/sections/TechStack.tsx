import { categories, techItems } from "@/data/tech-stack";

export default function TechStack() {
  return (
    <section id="skills" className="section-shell">
      <div className="section-container">
        <header className="section-heading">
          <div>
            <p className="section-label">04 / TOOLKIT</p>
            <h2 className="section-title">과제에 맞는 도구.</h2>
          </div>
          <p className="section-intro">경력에서 실제로 적용한 기술을<br />사용 목적에 따라 정리했습니다.</p>
        </header>
        <dl className="toolkit-list">
          {categories.map((category) => (
            <div key={category.key} className="toolkit-row">
              <dt className="text-sm font-medium text-heading">{category.label}</dt>
              <dd className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-body">
                {techItems.filter((item) => item.category === category.key).map((item) => <span key={item.name} className="toolkit-tag">{item.name}</span>)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

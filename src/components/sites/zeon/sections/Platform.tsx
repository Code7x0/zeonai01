import { zeonWorkspaceProducts } from "@/lib/zeonai/content";

export function Platform() {
  return (
    <section
      className="zn-sec zn-sec-alt"
      id="products"
      aria-labelledby="zn-products-title"
    >
      <div className="zn-wrap">
        <div className="zn-sec-head">
          <h2 id="zn-products-title" className="zn-h2">
            Six ways the platform shows up in the work
          </h2>
          <p className="zn-lead">{zeonWorkspaceProducts.lead}</p>
        </div>
        <div className="zn-cap-grid">
          {zeonWorkspaceProducts.products.map((p) => (
            <article key={p.id} className="zn-cap-card" id={p.id}>
              <h3 className="zn-h3">{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

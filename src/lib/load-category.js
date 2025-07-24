export async function loadCategory() {
  const res = await fetch('http://localhost:7000/api/category/show')
  const data = await res.json();
  return data
}
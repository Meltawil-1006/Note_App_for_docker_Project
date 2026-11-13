const list = document.getElementById('notes');
const input = document.getElementById('noteInput');

async function loadNotes() {
  const res = await fetch('/api/notes');
  const notes = await res.json();
  list.innerHTML = '';
  notes.forEach(n => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = n.text;
    const del = document.createElement('button');
    del.textContent = 'X';
    del.onclick = async () => {
      await fetch('/api/notes/' + n.id, { method: 'DELETE' });
      loadNotes();
    };
    li.append(span, del);
    list.appendChild(li);
  });
}

document.getElementById('addBtn').onclick = async () => {
  const text = input.value.trim();
  if (!text) return;
  await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  input.value = '';
  loadNotes();
};

loadNotes();

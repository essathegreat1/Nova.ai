const promptEl = document.querySelector('#prompt');
const countEl = document.querySelector('#count');
const result = document.querySelector('#result');
const output = document.querySelector('#output');
const feedback = document.querySelector('#feedback');
promptEl.addEventListener('input', () => countEl.textContent = `${promptEl.value.length} / 1200`);
document.querySelector('#example').addEventListener('click', () => {
  promptEl.value = 'A peaceful futuristic city floating above the clouds at golden sunrise, tiny flying vehicles crossing between glass towers, soft volumetric light, smooth camera glide, beautiful atmospheric detail';
  countEl.textContent = `${promptEl.value.length} / 1200`;
});
document.querySelector('#generate').addEventListener('click', () => {
  const idea = promptEl.value.trim();
  if (!idea) { promptEl.focus(); feedback.textContent = 'First, describe the video you want to create.'; return; }
  const style = document.querySelector('#style').value;
  const ratio = document.querySelector('#ratio').value;
  const length = document.querySelector('#length').value;
  output.textContent = `Create a ${length} ${style.toLowerCase()} video, aspect ratio ${ratio}.\n\nScene: ${idea}\n\nVisual direction: coherent composition, intentional camera movement, detailed environment, consistent subjects, polished lighting, smooth motion, high visual quality.\n\nAvoid: flicker, warped objects, unreadable text, sudden scene changes, inconsistent character details.`;
  result.hidden = false;
  feedback.textContent = 'Prompt prepared on your device. No account or API key needed for this step.';
  result.scrollIntoView({behavior:'smooth',block:'start'});
});
document.querySelector('#copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(output.textContent); feedback.textContent = 'Prompt copied.'; }
  catch { feedback.textContent = 'Select and copy the prompt text manually.'; }
});
document.querySelector('#download').addEventListener('click', () => {
  const blob = new Blob([output.textContent], {type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'novacreate-video-prompt.txt'; a.click();
  URL.revokeObjectURL(url); feedback.textContent = 'Prompt download started.';
});

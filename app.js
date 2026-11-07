const menu=document.querySelector('#menu'),sidebar=document.querySelector('#sidebar');
menu.addEventListener('click',()=>{const open=sidebar.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{sidebar.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+entry.target.id))}})},{rootMargin:'-15% 0px -65% 0px'});
document.querySelectorAll('.section').forEach(section=>observer.observe(section));
const viewer=document.querySelector('#viewer'),viewerImg=document.querySelector('#viewer-image');
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{viewerImg.src=button.dataset.image;viewerImg.alt=button.dataset.caption;document.querySelector('#viewer-title').textContent=button.dataset.caption;viewer.showModal()}));
document.querySelector('#close-viewer').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',event=>{if(event.target===viewer){const r=viewer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)viewer.close()}});
const printDialog=document.querySelector('#print-dialog'),statusText=document.querySelector('#print-status');
document.querySelector('#print-all').addEventListener('click',()=>{statusText.textContent='';printDialog.showModal()});
document.querySelector('#cancel-print').addEventListener('click',()=>printDialog.close());
async function readyImages(images){await Promise.all([...images].map(img=>{img.loading='eager';return img.decode().catch(()=>{throw new Error('تعذر تحميل أحد المرفقات. تحقق من وجود مجلد assets ثم أعد المحاولة.');})}))}
document.querySelector('#confirm-print').addEventListener('click',async event=>{const button=event.currentTarget;button.disabled=true;statusText.textContent='جارٍ تجهيز المحتوى والمرفقات للطباعة…';try{const full=document.querySelector('#include-evidence').checked;document.body.classList.toggle('print-full',full);await readyImages(document.querySelectorAll(full?'main img, #print-appendix img':'main img'));printDialog.close();await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));window.print()}catch(error){statusText.textContent=error.message}finally{button.disabled=false}});
document.querySelector('#print-cv').addEventListener('click',()=>{document.body.classList.remove('print-full');document.body.classList.add('print-cv');window.print()});
window.addEventListener('afterprint',()=>document.body.classList.remove('print-cv','print-full'));

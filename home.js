'use strict';
const continentDialog=document.getElementById('continentDialog');
document.querySelectorAll('[data-continent]').forEach(button=>button.addEventListener('click',()=>{document.getElementById('dialogTitle').textContent=button.dataset.continent;continentDialog.showModal();}));
document.getElementById('closeDialog').addEventListener('click',()=>continentDialog.close());
continentDialog.addEventListener('click',event=>{if(event.target!==continentDialog)return;const bounds=continentDialog.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)continentDialog.close();});

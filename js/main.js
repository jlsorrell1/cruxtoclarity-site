(function(){
  var y=document.getElementById('yr'); if(y) y.textContent=new Date().getFullYear();

  var btn=document.getElementById('copy-btn'), addr=document.getElementById('addr');
  btn.addEventListener('click',function(){
    var done=function(){btn.textContent='Copied';btn.setAttribute('data-done','');setTimeout(function(){btn.textContent='Copy';btn.removeAttribute('data-done')},1800)};
    var fallback=function(){var r=document.createRange();r.selectNodeContents(addr);var s=getSelection();s.removeAllRanges();s.addRange(r);btn.textContent='Selected';};
    try{navigator.clipboard.writeText(addr.textContent.trim()).then(done,fallback)}catch(e){fallback()}
  });

  var form=document.getElementById('contact-form'), msg=document.getElementById('form-msg');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var n=form.name.value.trim(), em=form.email.value.trim(), c=form.company.value.trim(), m=form.message.value.trim();
    if(!n||!em||!/^\S+@\S+\.\S+$/.test(em)){
      msg.textContent='Please add your name and a valid email address so John can reply.';
      (!n?form.name:form.email).focus(); return;
    }
    var body='Name: '+n+'\nEmail: '+em+(c?'\nCompany: '+c:'')+'\n\n'+(m||'I’d like to schedule a discovery call.');
    var href='mailto:John@cruxtoclarity.com?subject='+encodeURIComponent('Discovery call: '+(c||n))+'&body='+encodeURIComponent(body);
    var a=document.createElement('a'); a.href=href; document.body.appendChild(a); a.click(); a.remove();
    msg.textContent='Your email app should open with this message ready to send. If it doesn’t, email John@cruxtoclarity.com directly.';
  });
})();

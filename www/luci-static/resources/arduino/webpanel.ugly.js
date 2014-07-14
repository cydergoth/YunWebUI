"use strict";function formCheck(e){function a(e){return e==null||e===""}var t=e["wifi.ssid"],n=e["wifi.encryption"],r=e["wifi.password"],i=e.hostname,s=e.password,o,u=document.getElementById("error_response");return u.innerHTML="",o=!1,r.className="normal",t.className="normal",i.className="normal",s.className="normal",u.className="hidden",!t.disabled&&a(t.value)&&(errorHandler(t,u,"Please choose a WiFi network name"),o=!0),!r.disabled&&n.value!="none"&&(a(r.value)?(errorHandler(r,u,"Please choose a WiFi password"),o=!0):n.value!="wep"&&r.value.length<8&&(errorHandler(r,u,"WiFi password should be 8 char at least"),o=!0)),a(i.value)?(errorHandler(i,u,"Please choose a name for your Y&uacute;n"),o=!0):i.value.match(/[^a-zA-Z0-9]/)&&(errorHandler(i,u,"You can only use alphabetical characters for the hostname (A-Z or a-z)"),o=!0),s.value!=null&&s.value!=""&&s.value.length<8?(errorHandler(s,u,"Password should be 8 char at least"),o=!0):passwords_match()||(errorHandler(s,u,"Passwords do not match"),o=!0),!o}function formReset(){setTimeout(function(){grey_out_wifi_conf(!document.getElementById("wificheck").checked),onchange_security(document.getElementById("wifi_encryption"))},100)}function errorHandler(e,t,n){e.className="error",t.className="visible",t.innerHTML="<p>"+t.innerHTML+n+"<br /></p>"}function goto(e){return document.location=e,!1}function onchange_security(e){var t=document.getElementById("wifi_password_container"),n=document.getElementById("wifi_password");e.value=="none"?t.setAttribute("class","hidden"):(t.removeAttribute("class"),n.value="",n.focus())}function send_post(e,t,n){var r={};for(var i=3;i<arguments.length;i++)t[arguments[i]].disabled||(r[arguments[i]]=t[arguments[i]].value);var s=doEncrypt(key_id,0,public_key,JSON.stringify(r)),o=document.getElementById(n);return o.pgp_message.value=s,o.submit(),!1}function grey_out_wifi_conf(e){e?document.getElementById("wifi_container").setAttribute("class","disabled"):document.getElementById("wifi_container").setAttribute("class",""),document.getElementById("wifi_password").disabled=e,document.getElementById("wifi_ssid").disabled=e,document.getElementById("wifi_encryption").disabled=e,document.getElementById("detected_wifis").disabled=e}function passwords_match(){var e=document.getElementById("confpassword"),t=document.getElementById("password");return e.value==t.value}function show_message_is_passwords_dont_match(){passwords_match()?document.getElementById("pass_mismatch").setAttribute("class","hidden error_container input_message"):document.getElementById("pass_mismatch").setAttribute("class","error_container input_message")}function onclick_upload(){$("#progress_bar_upload").attr("style",""),$("#upload_button").addClass("btn").attr("disabled","true")}var pu,key_id,public_key;typeof getPublicKey=="function"&&(pu=new getPublicKey(pub_key),key_id=pu.keyid,public_key=pu.pkey.replace(/\n/g,"")),document.body.onload=function(){$("#progress_bar_upload").length>0&&$("#upload_button").click(onclick_upload),document.getElementById("username")&&document.getElementById("password").focus();var e=document.getElementById("wificheck");e&&(e.onclick=function(e){grey_out_wifi_conf(!e.target.checked)});var t=document.getElementById("wifi_encryption");t&&(t.onchange=function(e){onchange_security(e.target)});var n=document.getElementById("confpassword");n&&(n.onkeyup=show_message_is_passwords_dont_match,document.getElementById("password").onkeyup=show_message_is_passwords_dont_match);var r=document.getElementById("dmesg");r&&($("#dmesg").hide(),$("#dmesg_toogle").on("click",function(){return $(this).text()=="Show"?($("#dmesg").show(),$(this).text("Hide")):($("#dmesg").hide(),$(this).text("Show")),!1}));var i=document.getElementById("detected_wifis");if(i){var s=function(){var e=$("#detected_wifis");return e[0].disabled?!1:(e.empty(),e.append("<option>Detecting ...</option>"),$.get(refresh_wifi_url,function(t){e.empty(),e.append("<option>Select a wifi network...</option>");for(var n=0;n<t.length;n++){var r='<option value="'+t[n].name+"|||"+t[n].encryption+'">'+t[n].name;t[n].encryption!=="none"&&(r=r+" ("+t[n].pretty_encryption+")"),r+="</option>",e.append(r)}}),!1)};document.getElementById("refresh_detected_wifis").onclick=s,i.onchange=function(){var e=$("#detected_wifis").val().split("|||");if(e.length!==2)return;$("#wifi_ssid").val(e[0]);var t=$("#wifi_encryption");t.val(e[1]),t.change()},s()}var o=document.getElementById("restopen");if(o){var u=function(){var e={};e[this.name]=$(this).val(),$.post(this.form.action,e)};o.onclick=u,document.getElementById("restpass").onclick=u}};
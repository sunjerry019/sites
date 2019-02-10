var bArray;
var bookmarklets =
{
    init: function ()
    {
        pinterest = "javascript:void((function()%7Bvar%20e=document.createElement('script');e.setAttribute('type','text/javascript');e.setAttribute('charset','UTF-8');e.setAttribute('src','http://assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999);document.body.appendChild(e)%7D)());";

        twitter = "javascript:(function()%7Bwindow.twttr=window.twttr%7C%7C%7B%7D;var%20D=550,A=450,C=screen.height,B=screen.width,H=Math.round((B/2)-(D/2)),G=0,F=document,E;if(C%3EA)%7BG=Math.round((C/2)-(A/2))%7Dwindow.twttr.shareWin=window.open('http://twitter.com/share','','left='+H+',top='+G+',width='+D+',height='+A+',personalbar=0,toolbar=0,scrollbars=1,resizable=1');E=F.createElement('script');E.src='http://platform.twitter.com/bookmarklets/share.js?v=1';F.getElementsByTagName('head')%5B0%5D.appendChild(E)%7D());";

        bitly = "javascript:var%20d=document,w=window,enc=encodeURIComponent,e=w.getSelection,k=d.getSelection,x=d.selection,s=(e?e():(k)?k():(x?x.createRange().text:0)),s2=((s.toString()=='')?s:('%22'+enc(s)+'%22')),f='http://bitly.com/m/',l=d.location,p='?v=3&u='+enc(l.href)%20+'&s='+enc(d.title)+'%20'+s2,u=f+p;try{if(!/^(.*\.)?tumblrzzz[^.]*$/.test(l.host))throw(0);tstbklt();}catch(z){a%20=function(){if(!w.open(u))l.href=u;};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else%20a();}void(0)";

        google_reader = "javascript:var%20b=document.body;if(b&&!document.xmlVersion){void(z=document.createElement('script'));void(z.src='http://www.google.com/reader/ui/subscribe-bookmarklet.js');void(b.appendChild(z));}else{location='http://www.google.com/reader/view/feed/'+encodeURIComponent(location.href)}";

        delicious = "javascript:(function()%7Bf='http://www.delicious.com/save?url='+encodeURIComponent(window.location.href)+'&title='+encodeURIComponent(document.title)+'¬es='+encodeURIComponent(''+(window.getSelection?window.getSelection():document.getSelection?document.getSelection():document.selection.createRange().text))+'&v=6&';a=function()%7Bif(!window.open(f+'noui=1&jump=doclose','deliciousuiv6','location=1,links=0,scrollbars=0,toolbar=0,width=550,height=585'))location.href=f+'jump=yes'%7D;if(/Firefox/.test(navigator.userAgent))%7BsetTimeout(a,0)%7Delse%7Ba()%7D%7D)()";

        google_bookmark = 'javascript:(function(){var a=window,b=document,c=encodeURIComponent,d=a.open("http://www.google.com/bookmarks/mark?op=edit&output=popup&bkmk="+c(b.location)+"&title="+c(b.title),"bkmk_popup","left="+((a.screenX||a.screenLeft)+10)+",top="+((a.screenY||a.screenTop)+10)+",height=420px,width=550px,resizable=1,alwaysRaised=1");a.setTimeout(function(){d.focus()},300)})();';

        instapaper = "javascript:function iprl5(){var d=document,z=d.createElement('scr'+'ipt'),b=d.body;try{if(!b)throw(0);d.title='(Saving...) '+d.title;z.setAttribute('src','http://www.instapaper.com/j/VIbChxExXDOZ?u='+encodeURIComponent(d.location.href)+'&t='+(new Date().getTime()));b.appendChild(z);}catch(e){alert('Please wait until the page has loaded.');}}iprl5();void(0)";

        facebook = "javascript:var%20d=document,f='http://www.facebook.com/share',l=d.location,e=encodeURIComponent,p='.php?src=bm&v=4&i=1322068906&u='+e(l.href)+'&t='+e(d.title);1;try%7Bif%20(!/%5E(.*%5C.)?facebook%5C.%5B%5E.%5D*$/.test(l.host))throw(0);share_internal_bookmarklet(p)%7Dcatch(z)%20%7Ba=function()%20%7Bif%20(!window.open(f+'r'+p,'sharer','toolbar=0,status=0,resizable=1,width=626,height=436'))l.href=f+p%7D;if%20(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else%7Ba()%7D%7Dvoid(0)";

        evernote = "javascript:(function(){EN_CLIP_HOST='http://www.evernote.com';try{var x=document.createElement('SCRIPT');x.type='text/javascript';x.src=EN_CLIP_HOST+'/public/bookmarkClipper.js?'+(new Date().getTime()/100000);document.getElementsByTagName('head')[0].appendChild(x);}catch(e){location.href=EN_CLIP_HOST+'/clip.action?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title);}})();";

        tumblr = "javascript:var%20d=document,w=window,e=w.getSelection,k=d.getSelection,x=d.selection,s=(e?e():(k)?k():(x?x.createRange().text:0)),f='http://www.tumblr.com/share',l=d.location,e=encodeURIComponent,p='?v=3&u='+e(l.href)%20+'&t='+e(d.title)%20+'&s='+e(s),u=f+p;try%7Bif(!/%5E(.*%5C.)?tumblr%5B%5E.%5D*$/.test(l.host))throw(0);tstbklt();%7Dcatch(z)%7Ba%20=function()%7Bif(!w.open(u,'t','toolbar=0,resizable=0,status=1,width=450,height=430'))l.href=u;%7D;if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else%20a();%7Dvoid(0)";

        posterous = "javascript:var%20b=document.body;var%20POSTEROUS___bookmarklet_domain='http://posterous.com';var%20d=new%20Date();var%20e=(new%20Date(d.getFullYear(),d.getMonth(),d.getDate())).getTime();if(b&&!document.xmlVersion)%7Bvoid(z=document.createElement('script'));void(z.type='text/javascript');void(z.src='http://posterous.com/javascripts/bookmarklet.js?'+e);void(b.appendChild(z));%7Delse%7B%7D";

        digg = "javascript:location.href='http://digg.com/submit?phase=3&url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title)";

        reddit = "javascript:location.href='http://www.reddit.com/submit?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title)";

        translate_to_en = "javascript:var%20t=((window.getSelection&&window.getSelection())||(document.getSelection&&document.getSelection())||(document.selection&&document.selection.createRange&&document.selection.createRange().text));var%20e=(document.charset||document.characterSet);if(t!=''){location.href='http://translate.google.com/translate_t?text='+t+'&hl=en&langpair=auto|en&tbb=1&ie='+e;}else{location.href='http://translate.google.com/translate?u='+escape(location.href)+'&hl=en&langpair=auto|en&tbb=1&ie='+e;};";

        site_info = "javascript:void(window.open('http://builtwith.com/?'+location.host));";

        show_images = "javascript:n='';for(i=0;i%3Cdocument.images.length;i++)%7Bn+='%3Cimg%20src='+document.images%5Bi%5D.src+'%3E%20'+document.images%5Bi%5D.width+'x'+document.images%5Bi%5D.height+'%3Cbr%3E%3Cbr%3E'%7D;if(n!='')%7Bdocument.write('%3Cp%20style=font-size:11px;font-family:verdana,sans;%3E'+n+'%3C/p%3E');void(document.close())%7Delse%7Balert('i%20see%20no%20images')%7D";

        validate_html = "javascript:void(open('http://validator.w3.org/check?uri='+escape(document.location)))";
		
		bArray = new Array(pinterest, twitter, bitly, google_reader, delicious, google_bookmark, instapaper, facebook, evernote, tumblr, posterous, digg, reddit, translate_to_en, site_info, show_images);
    },

    bookmark: function (b, id)
    {
		id = "#" + id;
		var bookmarkUrl = this.href;
		var bookmarkTitle = this.title;
	 
		if (window.sidebar) { // For Mozilla Firefox Bookmark
			window.sidebar.addPanel(bookmarkTitle, bookmarkUrl,"");
		} else if( window.external || document.all) { // For IE Favorite
			window.external.AddFavorite( bookmarkUrl, bookmarkTitle);
		} else if(window.opera) { // For Opera Browsers
			$(id).attr("href",bookmarkUrl);
			$(id).attr("title",bookmarkTitle);
			$(id).attr("rel","sidebar");
		} else { // for other browsers which does not support
			 alert('Your browser does not support this bookmark action');
			 return false;
		}
		//http://www.developersnippets.com/2009/05/10/simple-bookmark-script-using-jquery/
    },

    ver: "1.00"
}

function logConsole(msg)
{
    try    
    {
       console.log(msg); 
    }
    catch(e){}
}

$(window).load(function (e)
{
    bookmarklets.init();
    //webLayout.styleGenerate();
    webLayout.generate();
    $("a.setBookmarklet").click(function (e)
    {
        e.preventDefault(); // this will prevent the anchor tag from going the user off to the link
        bookmarklets.bookmark(this.dataset.indx, this.id);
    });
});
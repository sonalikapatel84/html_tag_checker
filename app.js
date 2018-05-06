var htmlContent = "The following text <C><B>is centred and in boldface</B></C>"; // Note: String without any html tag will consider as valid html snippet. If it’s not valid in your case, in that case you can check opening tag count first.
var htmlContent1 = "<B>This <\g>is <B>boldface</B> in <<*> a</B> <\6> <<d>sentence";
var htmlContent2 = "<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>";
var htmlContent3 = "<B>This should be in boldface, but there is an extra closing tag</B></C>";
var htmlContent4 = "<B><C>This should be centred and in boldface, but there is a missing closing tag</C>";

function validHTML(html) {
    var openingTags, closingTags;
  
    html        = html.replace(/<[^>]*\/\s?>/g, '');      // Remove all self closing tags
    html        = html.replace(/<(br|hr|img).*?>/g, '');  // Remove all <br>, <hr>, and <img> tags
    openingTags = html.match(/<[^\/].*?>/g) || [];        // Get remaining opening tags
    closingTags = html.match(/<\/.+?>/g) || [];           // Get remaining closing tags

    function readthetags(str) {
      var originalarr = [];
      var tagnamesarray = [];
      for(var checker = 0; checker <= str.length - 1; checker++ )
        originalarr.push( str[checker]);
        var splitstr = JSON.stringify(originalarr).split("");
        for( var i=0; i < splitstr.length; i++) {
          if (splitstr[i].match(/[A-Za-z]/)) {
            tagnamesarray.push(splitstr[i]);
          }
        }
      return tagnamesarray;
    }//readthetags done
  
    
    function reversethetags(s) {
      var o = [];
      var closingtagnamesarray = [];
      for (var i = s.length - 1; i >= 0; i--)
        o.push(s[i]);
        var splitstr = JSON.stringify(o).split("");
        for( var i=0; i < splitstr.length; i++) {
          if (splitstr[i].match(/[A-Za-z]/)) {
            closingtagnamesarray.push(splitstr[i]);
          }
        }
      return closingtagnamesarray;
    }


    function arr_diff (a1, a2) {

      var a = [], diff = [];
  
      for (var i = 0; i < a1.length; i++) {
          a[a1[i]] = true;
      }
  
      for (var i = 0; i < a2.length; i++) {
          if (a[a2[i]]) {
              delete a[a2[i]];
          } else {
              a[a2[i]] = true;
          }
      }
  
      for (var k in a) {
          diff.push(k);
      }
  
      return diff;
  }
  

    function checkArrays( arrA, arrB ){
      //console.log(arrA);
      //console.log(arrB);
      //check if lengths are different
      if(arrA.length !== arrB.length) {
        var diff = [];
        diff=arr_diff(arrA, arrB);
        //console.log("diff"+diff);
        if(arrB.length > arrA.length){
          console.log("Expected #, Found </"+diff+">");
        }
        else{
          console.log("Expected </"+diff+">, Found #");
        }
        return false;
      }

      for(var i=0;i<arrA.length;i++){
           if(arrA[i]!==arrB[i]) { 
             console.log("Expected </"+ arrB[i]+">, Found </"+ arrA[i]+">");
             return false; }
      }
  
      return true;
  }

    return checkArrays(readthetags(openingTags), reversethetags(closingTags)) ? true : false;
  }
  

  if(validHTML(htmlContent4)) {
    console.log('Correctly tagged paragraph');
  }
  else {
    console.log('');
  } 
// $(document).ready(function(){

  var posts =[];

/*ONCLICK EVENT TO GET THE INPUT VALUE (POST) AND ASSIGN IT TO VARIABLES WHICH ARE ASSIGNED TO OBJ THAT GETS PUSHED TO ARRAY*/
  $('.add-post').on('click', getPost);


  function getPost(){
    var text=$('#post-name').val();
    var id = Math.random().toString(36).substr(2, 9);

    var post = {
      text:text,
      id:id
    };

    posts.push(post);
    addPost(); /*INVOKE ADDING THE POST TO THE DIV*/

  
  }

  function addPost(){
    $('.posts').empty();
    for (var i=0; i<posts.length;i++){
       $('.posts').append('<p class="post" data-id="'+posts[i].id+'">'+posts[i].text+'</p>'+'<a href="#" class="remove">remove</a>');
      };


/*APPEND ABILITY TO COMMENT TO EACH POST*/

      $('.posts').append('<br><div class="comments"><h6>Add comment for this post</h6><input type="text" class="comment" placeholder="Comment"></input> <h6>Username</h6><input type="text" class="username" placeholder="username"></input><br><button id="comment">Submit Comment</button></div><div class="comm"></div>');


/*SET ONCLICK EVENT FOR THE COMMENT TO BE ADDED*/
      $('#comment').on('click', function() {
        var getComment=$(this).closest('div').find('.comment').val();
        var getUsername=$(this).closest('div').find('.username').val();
        // alert(getComment);
        // alert(getUsername);
        $('.comm').append('<p>'+getComment+'</p><p>Written by:'+getUsername+'</p>');
        // $(this).closest('div').remove();

        // addComment(getComment, getUsername);

      });

/*GET 'THIS' REMOVE BUTTON, GET THE DATA-ID FOR CLOSEST PARAGRAPH AND STICK IT INTO REMOVEPOST*/
     $('.remove').on('click',function(){
    var whine = $(this).prev().attr("data-id");
    removePost(whine);
  });
  };
    
/*GET THE INDIVIDUAL ID OF THE POST WE WANT TO REMOVE AND LOOK FOR IT IN THE ARRAY, THEN REMOVE IT FROM THE ARRAY,
EMPTY THE DIV AND ADD THE POSTS BACK IN THERE*/
    function removePost(whine){
      for (var i=0; i<posts.length;i++){
        
        if (whine===posts[i].id){
          
          posts.splice(i,1);
          $('.posts').empty();
          for (var i=0; i<posts.length;i++){
           $('.posts').append('<p class="post" data-id="'+posts[i].id+'">'+posts[i].text+'</p>'+'<a href="#" class="remove">remove</a>');
      };
        };

    };
  };
 

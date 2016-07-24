var SpacebookApp = function () {
  var posts = [
    {text: "Hello world",
    id: 0,
    comments:[
      { text: "text 1 comment 1"},
      { text: "text 1 comment 2"},
      { text: "text 1 comment 3"}
    ]},
    {text: "Hello world", id: 1, comments:[
      { text: "text 2 comment 1"},
      { text: "text 2 comment 2"},
      { text: "text 2 comment 3"}
    ]},
    {text: "Hello world", id: 2, comments:[
      { text: "text 3 comment 1"},
      { text: "text 3 comment 2"},
      { text: "text 3 comment 3"}
    ]}
  ];

  // the current id to assign to a post
  var currentId = 3;
  var $posts = $('.posts');

  var _findPostById = function (id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  }

  var createPost = function (text) {
    var post = {
      text: text,
      id: currentId,
      comments:[]
    }

    currentId += 1;

    posts.push(post);

  }

  var renderPosts = function () {
    $posts.empty();

    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];

      var commentsContainer = '<div class="comments-container">' +
      '<input type="text" class="comment-name">' +
      '<button class="btn btn-primary add-comment">Post Comment</button> </div>';

      $posts.append('<div class="post" data-id=' + post.id + '>'
        + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
        commentsContainer + '</div>');
    }
  }

  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;

    var post = _findPostById(id);

    posts.splice(posts.indexOf(post), 1);
    $clickedPost.remove();
  }

  var createComment = function(comment){
    var text = $(comment).prev().val();
    var postid = $(comment).parent().parent().data().id;
    var arrayPlace = _findPostById(postid);
    var index = posts.indexOf(arrayPlace);
    posts[index].comments.push({text});
    renderComments(comment);
    
  }

    var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).parent('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
    
    }

  var renderComments = function(renderComment){
    $('.comment-display').empty();
    var postid = $(renderComment).closest('.post').data().id;
    var arrayPlace = _findPostById(postid);
    var index = posts.indexOf(arrayPlace);
    for (var i=0; i<posts.length; i++){
      for (var j=0; j<posts[i].comments.length; j++){
        if (posts[i].id===index){
           $('.comments-container').append('<p class="comment-display">'+posts[i].comments[j].text+'</p>  <a href="#" class="remove-comment">Remove Comment</a> ');
                  
        }
      } 
    }
    
    
  }





    function removeComment (removeComment){
    var postId = $(removeComment).closest('.post').data().id;
    var commentIndex=$(removeComment).prev().index();
    console.log('commentd Index', commentIndex);
    posts[postId].comments.splice(commentIndex, 1);


  }


  return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,

    // TODO: Implement
    createComment: createComment,

    // TODO: Implement
    renderComments: renderComments,

    // TODO: Implement
    removeComment: removeComment,
    toggleComments: toggleComments
  }
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function (e) {
  e.preventDefault();

  var text = $('#post-name').val();
  app.createPost(text);
  app.renderPosts();
});

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
});


$('.posts').on('click','.show-comments', function () {
  app.renderComments(this);
});

$('.posts').on('click','.show-comments', function () {
  app.toggleComments(this);
 
});

$('.posts').on('click','.add-comment', function() {
  app.createComment(this);
  
});

$('.post').on('click', '.remove-comment', function() {
  app.removeComment(this);

  
});
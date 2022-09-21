import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Option "mo:base/Option";

actor {

  stable var postId = 0;

  public type Post = {
    text : Text;
    likes : Nat;
    dislikes : Nat;
    Id : Nat;
    created_at : Int;
    comment : [Text];
  };

  public type Posts = List.List<Post>;

  var posts = HashMap.HashMap<Principal, Posts>(10, Principal.equal, Principal.hash);

  func post(author : Principal  , content : Text , postId : Nat){
    let post = {
      text = content;
      likes = 0; //initial likes 
      Id = postId;
      dislikes = 0; //initial dislikes
      created_at = Time.now();
      comment = [];
    };
    let newPosts = switch (posts.get(author)) {
      case null { List.make(post) };
      case (?oldPosts) { List.push(post, oldPosts) };
    };
    posts.put(author, newPosts);
  };

  public shared ({caller}) func addPost(content : Text){
    post(caller , content , postId);
    postId += 1;
  };
  
  public shared query ({ caller }) func myPosts() : async Posts {
    switch (posts.get(caller)) {
      case null { null };
      case (?p) { p };
    }
  };

  public query func allPosts() : async [(Principal, Posts)]{
    Iter.toArray<(Principal, Posts)>(posts.entries());
  };

  public func addComment(id : Nat , comment : Text) {
    let Comment_to_array = [comment];
    for((author, Posts) in posts.entries()){
      for(value in List.toIter(Posts)){
        if(value.Id == id){
          let newComment = Array.append(value.comment, Comment_to_array);
          let updatepost = editPost(List.toArray(Posts),id,null, null,null,null, ?newComment);
          let updateList = List.fromArray(updatepost);
          posts.put(author, updateList);
        }
      };
      
    }
  };

  func editPost(
      existingPosts: [Post],
      targetPostId: Nat, 
      text: ?Text,
      likes: ?Nat,
      dislikes : ?Nat,
      created_at : ?Int,
      comment : ?[Text]
    ): [Post] {
     // there's probably a better way to do this, but it assumes the [Post] is going to contain a Post with the id given
      var throwError: Bool = true;
      
      let updateFcn = func(post: Post): Post {
        // so we are iterating over the [Posts] returning each post, if it has the id
       // overwrite existing values with given values, or just copy previous values
        if (post.Id == targetPostId) {
          throwError := false;
          return {
            Id = targetPostId;
            text = Option.get<Text>(text, post.text);
            likes = Option.get<Nat>(likes, post.likes);
            dislikes = Option.get<Nat>(dislikes, post.likes);
            created_at = Option.get<Int>(created_at, post.created_at);
            comment = Option.get<[Text]>(comment , post.comment);
          };
        } else { post }; // don't update a post not updated
      };
      // now using the function above
      let updated = Array.map<Post, Post>(existingPosts, updateFcn);
      assert(not throwError); 
      return updated; // since a post was found with the id, don't trap and return the updated list
    };
}
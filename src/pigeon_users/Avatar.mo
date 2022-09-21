import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";

actor Users{
  type Bio = {
    name : Text;
    displayName : Text;
    about : Text;
    location : Text;
  };

  type Profile = {
    id : Principal;
    bio : Bio;
  };

  type UpdateProfile = {
    bio : Bio;
  };

  type Error = {
    #NotFound;
    #AlreadyExist;
  };

  type Success = {
    #Created;
    #profileupdated;
    #profiledeleted;
  };

  var Profiles = HashMap.HashMap<Principal , Profile>(0, Principal.equal , Principal.hash);

  public shared (msg) func whoami() : async Principal {
        msg.caller
  };

  public shared ({caller}) func createProfile(profile : UpdateProfile) : async Result.Result<Success , Error>{

    let userProfile = {
      id = caller;
      bio = profile.bio;
    };
    let newProfile = switch(Profiles.get(caller)){
      case null { 
        Profiles.put(caller , userProfile);
        #ok(#Created);
      };
      case (?oldProfile) {#err(#AlreadyExist)};
    };
  };

  public shared ({caller}) func readProfile() : async Result.Result<Profile , Error> {
    let oldData = Profiles.get(caller);
    Result.fromOption(oldData , #NotFound);
  };

  public shared({caller}) func updateProfile(profile : UpdateProfile) : async Result.Result<Success , Error>{
    let userProfile = {
      id = caller;
      bio = profile.bio;
    };
    switch(Profiles.get(caller)){
      case null { 
        #err(#NotFound);
      };
      case (?oldProfile) {
        let newprofile = Profiles.replace(caller , userProfile);
        #ok(#profileupdated);
      };
    };
  };

  public shared ({caller}) func deleteProfile() : async Result.Result<Success , Error>{
    
    switch(Profiles.get(caller)){
      case null { 
        #err(#NotFound)
      };
      case (?oldProfile) {
        let newprofile = Profiles.remove(caller);
        #ok(#profiledeleted);
      };
    };
  };
}
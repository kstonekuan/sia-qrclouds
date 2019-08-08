const englishNSFW = [
  " ass",
  "fuck",
  "fuk",
  "fk",
  "fag",
  "faggot",
  "cunt",
  "jibai",
  "chibai",
  "cb",
  "ccb",
  "puki",
  " anal ",
  " knn",
  "whore",
  "bitch",
  "slut",
  "anal",
  "penis",
  "vagina",
  "vag",
  "dick",
  "nigger",
  "nig",
  "nibba"
]

function isAppropriate (string) {
  var isAppropriate = true;
  var i = 0;
  while(isAppropriate && englishNSFW[i]){
    if(string.includes(englishNSFW[i])){
      isAppropriate = false;
    }
    i++;
  }
  return isAppropriate;
}

export { isAppropriate };
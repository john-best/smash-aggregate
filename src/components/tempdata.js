export var data = {
    icon: "/fighters_icon/zero_suit_samus.png",
    fighter_name: "Zero Suit Samus",
    fighter_url: "zero_suit_samus",
    discord_url: "#",
    kh_url: "#",
    ssbw_url: "#",
  
    description:
      "she's not smash 4 zss but she's still good (but buff her anyways)",
    matchups: { mario: "", donkey_kong: "" },
  
    segments: [
      {
        id: 1,
        type: "links",
        title: "link title",
        links: [
          { id: 1, title: "Flip Kick Mechanics - Orio", url: "#", type: "youtube" },
          { id: 2, title: "epic combo video", url: "#", type: "twitter" },
          {
            id: 3,
            title: "link to reddit post on why game is good",
            url: "#",
            type: "linkify"
          }
        ]
      },
      { id: 2, type: "text", title: "text title", text: "hello world" }
    ]
  };
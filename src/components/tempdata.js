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

  segments: {
    "1abc": {
      type: "links",
      title: "link title",

      links: {
        "1abc_l1": {
          title: "Flip Kick Mechanics - Orio",
          url: "#",
          type: "youtube"
        },
        "1abc_l2": { title: "epic combo video", url: "#", type: "twitter" },
        "1abc_l3": {
          title: "link to reddit post on why game is good",
          url: "#",
          type: "linkify"
        }
      },
      link_ids: ["1abc_l1", "1abc_l2", "1abc_l3"]
    },

    "2abc": { type: "text", title: "text title", text: "hello world" }
  },

  segment_ids: ["1abc", "2abc"]
};

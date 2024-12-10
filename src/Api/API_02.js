import videos from "~/assets/videosImport";

const apiMoment = {
  getMoment: () => {
    return [
      {
        id: 0,
        date: `25-08-2024`,
        name: `THE PROCESS OF MAKING 12H03 - TOULIVER & MASTAL`,
        link:
          process.env.NODE_ENV === "production"
            ? videos[`/easeifytunes/MAKING 12H03 TOULIVER MASTAL.mp4`]
            : videos[`MAKING 12H03 TOULIVER MASTAL.mp4`],
      },
      {
        id: 1,
        date: `15-08-2024`,
        name: "THE PROCESS OF MAKING ĐÀO LIỄU - TOULIVER & TRIPLE D",
        link:
          process.env.NODE_ENV === "production"
            ? videos[`/easeifytunes/ĐÀO LIỄU TOULIVER TRIPLE D.mp4`]
            : videos[`ĐÀO LIỄU TOULIVER TRIPLE D.mp4`],
      },
      {
        id: 2,
        date: `10-08-2024`,
        name: `[BEAT BREAKDOWN] TRỐNG CƠM - TỰ LONG, SOOBIN, CƯỜNG SEVEN, (CÔNG DIỄN 1 ANH TRAI VƯỢT NGÀN CHÔNG GAI)`,
        link:
          process.env.NODE_ENV === "production"
            ? videos[`/easeifytunes/BEAT TRỐNG CƠM-ATVNTG.mp4`]
            : videos[`BEAT TRỐNG CƠM-ATVNTG.mp4`],
      },
    ];
  },
};

export default apiMoment;

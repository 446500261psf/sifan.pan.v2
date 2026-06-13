Playground — AI 视频素材目录
================================

把 AI 关键帧生成的视频文件放到这个目录,建议:
- 格式:mp4(H.264)优先,网页兼容性最好;mov 也可以
- 命名:小写 + 连字符,如 keyframe-film-01.mp4
- 封面:同名 poster 图(可选),如 keyframe-film-01-poster.png
- 体积:建议单个 < 20MB,过大会拖慢加载

放好文件后,到 src/data/playground.ts 里对应条目填上路径即可上线,例如:

  media: {
    src: 'playground/videos/keyframe-film-01.mp4',
    poster: 'playground/videos/keyframe-film-01-poster.png',
  },

卡片行为:hover 时静音循环预览,点击放大并带控制条。

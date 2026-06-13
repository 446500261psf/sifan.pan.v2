Scroll Turntable 序列帧素材
===========================

用 AI(或 Blender 等)生成一组物体/人物的 360° 转台序列帧后:

1. 帧命名为 frame-001.webp、frame-002.webp …(三位数,从 001 开始),放在本目录。
   - 推荐 60~120 帧,帧越多越顺滑
   - 推荐 webp 格式、宽度 1200px 左右,控制总体积
   - 所有帧必须同一尺寸、同一机位,只有物体角度变化(每帧旋转 360°/帧数)

2. 打开 src/components/playground/TurntableDemo.tsx,
   把顶部的 FRAME_COUNT 从 0 改成实际帧数(例如 60)。

完成后卡片会自动从程序化点云球切换为真实序列帧,滚动即可 scrub 旋转。

AI 生成转台帧的思路:
- 先生成一张物体的定妆图(正面)
- 用图生视频模型(Kling / Runway / Veo 等)提示 "camera orbits 360 degrees around the object, fixed framing, seamless loop"
- 再用 ffmpeg 拆帧:ffmpeg -i turntable.mp4 -vf "fps=N/时长" frame-%03d.webp

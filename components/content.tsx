import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Accordion, Form, Row, Col } from "react-bootstrap";
import style from "../styles/Content.module.css";

export const Content = () => {
  const backGroundImageNames = [
    "aqua0.webp",
    "aqua1.webp",
    "megumin.webp",
    "darkness.webp",
  ];

  const [state, setState] = useState({
    fontLoaded: false,
    externalBackgroundImage: null as unknown as HTMLImageElement,
    backgroundImageName: backGroundImageNames[0],
    lootBoxType: "新キャラ登場！",
    star: "0" as "0" | "1" | "2" | "3" | "4" | "5",
    characterName: "アクア",
    characterStyle: "",
    cv: "雨宮天",
    position: "0" as "0" | "1" | "2",
    hp: 60000,
    attack: 16000,
    magicAttack: 16000,
    defense: 1000,
    magicDefense: 800,
    rank: 24,
    level: 229,
    description:
      "【魔法】中衛で、神の力を使う、水を司る女神様。\n女神の怒りと悲しみを乗せた必殺の拳と、女神の\n愛と悲しみの鎮魂歌で、敵を浄化する。",
    quote:
      "「ゴッドレクイエムとは\n　　女神の愛と\n　　　悲しみの鎮魂歌！\n　　　　　　　相手は死ぬ！」",
    copyright: "Fake Copyright Axis Cult.",
    supplement:
      "\n対象のガチャの内容や開催期間は、予告なく変更する可能性があります。",
    ribbonColor: "#0064ff",
    statusAndDescriptionColor: "#0064ff",
    quoteColor: "#0064ff",
  });

  const drawPreview = () => {
    const backgroundImage = document.createElement("img");
    backgroundImage.src = "/img/" + state.backgroundImageName;
    backgroundImage.addEventListener("load", () => {
      const canvas = document.getElementById("canvas") as HTMLCanvasElement;
      if (!canvas) {
        return;
      }
      const context = canvas.getContext("2d") as CanvasRenderingContext2D;

      // 共通設定
      context.textBaseline = "top";
      context.lineJoin = "round";
      context.lineCap = "round";
      context.miterLimit = 1;
      context.clearRect(0, 0, canvas.width, canvas.height);

      // 背景
      if (state.externalBackgroundImage) {
        context.drawImage(
          state.externalBackgroundImage,
          0,
          0,
          state.externalBackgroundImage.width,
          state.externalBackgroundImage.height,
        );
      } else {
        context.drawImage(backgroundImage, 0, 0);
      }

      // リボンの影
      // リボンの横幅を計算するために、ガチャの種類を描画するときのフォントを指定する。イタリックは影響がないようなので？考慮しない
      context.lineWidth = 5;
      context.font = "bold 25px 'Kosugi Maru'";
      const ribbonWidth = Math.max(
        context.measureText(state.lootBoxType).width + 45,
        240,
      );
      context.fillStyle = "rgb(0, 0, 0, 0.3)";
      context.beginPath();
      context.moveTo(0, 20);
      context.lineTo(ribbonWidth, 20);
      context.lineTo(ribbonWidth - 10, 45);
      context.lineTo(ribbonWidth, 70);
      context.lineTo(0, 70);
      context.fill();

      // リボン
      {
        const rgb = convertHexToRgb(state.ribbonColor);
        context.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      }
      context.beginPath();
      context.moveTo(0, 15);
      context.lineTo(ribbonWidth, 15);
      context.lineTo(ribbonWidth - 10, 40);
      context.lineTo(ribbonWidth, 65);
      context.lineTo(0, 65);
      context.fill();
      // リボンの柄
      context.save();
      context.beginPath();
      context.moveTo(0, 15);
      context.lineTo(ribbonWidth, 15);
      context.lineTo(ribbonWidth - 10, 40);
      context.lineTo(ribbonWidth, 65);
      context.lineTo(0, 65);
      context.clip();
      {
        const rgb = convertHexToRgb(state.ribbonColor).map((e) =>
          0 <= e - 10 ? e - 10 : 0,
        );
        context.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      }
      for (let i = 0; i < 31; ++i) {
        context.beginPath();
        context.moveTo(5 + i * 30, 15);
        context.lineTo(20 + i * 30, 30);
        context.lineTo(5 + i * 30, 45);
        context.lineTo(-10 + i * 30, 30);
        context.fill();
        context.beginPath();
        context.moveTo(5 + i * 30, 45);
        context.lineTo(20 + i * 30, 60);
        context.lineTo(5 + i * 30, 75);
        context.lineTo(-10 + i * 30, 60);
        context.fill();
      }
      context.restore();
      // リボンの線
      context.strokeStyle = "white";
      context.lineWidth = 3;
      context.beginPath();
      context.moveTo(0, 21);
      context.lineTo(ribbonWidth - 2, 21);
      context.moveTo(0, 59);
      context.lineTo(ribbonWidth - 2, 59);
      context.stroke();
      // ガチャの種類
      context.lineWidth = 5;
      for (let i = 0; i < state.lootBoxType.length; ++i) {
        context.font = state.lootBoxType[i].match(/[!！♪]/)
          ? "italic bold 25px 'Kosugi Maru'"
          : "bold 25px 'Kosugi Maru'";
        const rgb = convertHexToRgb(state.ribbonColor).map((e) =>
          0 <= e - 15 ? e - 15 : 0,
        );
        context.strokeStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        context.strokeText(state.lootBoxType[i], 20 + i * 25, 28);
        context.fillStyle = "white";
        context.fillText(state.lootBoxType[i], 20 + i * 25, 28);
      }
      // 星
      const star = document.createElement("img");
      star.src = "/img/star.webp";
      star.addEventListener("load", () => {
        for (let i = 0; i <= parseInt(state.star); ++i) {
          context.drawImage(star, 20 + i * 31, 75);
        }
      });
      // 名前
      context.font = "bold 50px 'Kosugi'";
      context.strokeStyle = "rgba(0, 0, 0, 0.3)";
      context.lineWidth = 5;
      context.strokeText(state.characterName, 20, 113);
      context.fillStyle = "rgba(0, 0, 0, 0.3)";
      context.fillText(state.characterName, 20, 113);
      {
        context.beginPath();
        const strokeGradient = context.createLinearGradient(20, 110, 20, 160);
        strokeGradient.addColorStop(0.0, "rgb(191, 147, 82)");
        strokeGradient.addColorStop(1.0, "rgb(90, 56, 8)");
        context.strokeStyle = strokeGradient;
        context.lineWidth = 5;
        context.strokeText(state.characterName, 20, 110);
        const fillGradient = context.createLinearGradient(20, 110, 20, 160);
        fillGradient.addColorStop(0.0, "rgb(255, 252, 225)");
        fillGradient.addColorStop(1.0, "rgb(221, 184, 103)");
        context.fillStyle = fillGradient;
        context.fillText(state.characterName, 20, 110);
      }
      // キャラクタースタイル
      {
        const offset = context.measureText(state.characterName).width;
        context.font = "bold 35px 'Kosugi'";
        context.strokeStyle = "rgba(0, 0, 0, 0.3)";
        context.lineWidth = 5;
        context.strokeText(state.characterStyle, 20 + offset, 125);
        context.fillStyle = "rgba(0, 0, 0, 0.3)";
        context.fillText(state.characterStyle, 20 + offset, 125);
        context.beginPath();
        const strokeGradient = context.createLinearGradient(
          20 + offset,
          122,
          20 + offset,
          157,
        );
        strokeGradient.addColorStop(0.0, "rgb(191, 147, 82)");
        strokeGradient.addColorStop(1.0, "rgb(90, 56, 8)");
        context.strokeStyle = strokeGradient;
        context.lineWidth = 5;
        context.strokeText(state.characterStyle, 20 + offset, 122);
        const fillGradient = context.createLinearGradient(
          20 + offset,
          122,
          20 + offset,
          157,
        );
        fillGradient.addColorStop(0.0, "rgb(255, 252, 225)");
        fillGradient.addColorStop(1.0, "rgb(221, 184, 103)");
        context.fillStyle = fillGradient;
        context.fillText(state.characterStyle, 20 + offset, 122);
      }
      // CV
      context.font = "bold 25px 'Kosugi Maru'";
      {
        const gradient = context.createLinearGradient(20, 165, 20, 190);
        gradient.addColorStop(0.0, "rgb(176, 138, 93)");
        gradient.addColorStop(1.0, "rgb(90, 80, 53)");
        context.strokeStyle = gradient;
        context.lineWidth = 5;
        context.strokeText("CV:" + state.cv, 20, 165);
        context.fillStyle = "white";
        context.fillText("CV:" + state.cv, 20, 165);
      }
      // 位置
      const p = document.createElement("img");
      p.src = "/img/position" + state.position + ".webp";
      p.addEventListener("load", () => {
        context.drawImage(p, 20, 200);
      });
      // HP
      context.font = "bold 20px 'Kosugi Maru'";
      context.strokeStyle = "white";
      context.lineWidth = 5;
      context.strokeText("HP……" + state.hp, 20, 225);
      {
        const rgb = convertHexToRgb(state.statusAndDescriptionColor);
        context.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      }
      context.fillText("HP……" + state.hp, 20, 225);
      // 物理攻撃力
      context.font = "bold 20px 'Kosugi Maru'";
      context.strokeStyle = "white";
      context.lineWidth = 5;
      context.strokeText("物理攻撃力……" + state.attack, 20, 250);
      {
        const rgb = convertHexToRgb(state.statusAndDescriptionColor);
        context.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      }
      context.fillText("物理攻撃力……" + state.attack, 20, 250);
      // 魔法攻撃力
      context.font = "bold 20px 'Kosugi Maru'";
      context.strokeStyle = "white";
      context.lineWidth = 5;
      context.strokeText("魔法攻撃力……" + state.magicAttack, 20, 275);
      {
        const rgb = convertHexToRgb(state.statusAndDescriptionColor);
        context.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      }
      context.fillText("魔法攻撃力……" + state.magicAttack, 20, 275);
      // 物理防御力
      context.font = "bold 20px 'Kosugi Maru'";
      context.strokeStyle = "white";
      context.lineWidth = 5;
      context.strokeText("物理防御力……" + state.defense, 20, 300);
      {
        const rgb = convertHexToRgb(state.statusAndDescriptionColor);
        context.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      }
      context.fillText("物理防御力……" + state.defense, 20, 300);
      // 魔法防御力
      context.font = "bold 20px 'Kosugi Maru'";
      context.strokeStyle = "white";
      context.lineWidth = 5;
      context.strokeText("魔法防御力……" + state.magicDefense, 20, 325);
      {
        const rgb = convertHexToRgb(state.statusAndDescriptionColor);
        context.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      }
      context.fillText("魔法防御力……" + state.magicDefense, 20, 325);
      // ステータス補足
      context.font = "bold 15px 'Kosugi Maru'";
      context.strokeStyle = "white";
      context.lineWidth = 5;
      context.strokeText(
        `※RANK${state.rank}/Lv${state.level}/装備強化MAXのステータスです。`,
        20,
        350,
      );
      {
        const rgb = convertHexToRgb(state.statusAndDescriptionColor);
        context.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      }
      context.fillText(
        `※RANK${state.rank}/Lv${state.level}/装備強化MAXのステータスです。`,
        20,
        350,
      );
      // キャラ説明
      context.font = "bold 20px 'Kosugi Maru'";
      {
        context.strokeStyle = "white";
        context.lineWidth = 5;
        const xs = Array(
          (state.description.match(/\n/g) || []).length + 1,
        ).fill(20);
        const ys = Array((state.description.match(/\n/g) || []).length + 1)
          .fill(379)
          .map((e, i) => e + i * 24);
        drawString(context, "stroke", xs, ys, state.description);
        const rgb = convertHexToRgb(state.statusAndDescriptionColor);
        context.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        drawString(context, "fill", xs, ys, state.description);
      }
      // 補足
      context.font = "bold 13px 'Kosugi Maru";
      {
        context.strokeStyle = "black";
        context.lineWidth = 2;
        const xs = Array((state.supplement.match(/\n/g) || []).length + 1).fill(
          20,
        );
        const ys = Array((state.supplement.match(/\n/g) || []).length + 1)
          .fill(459)
          .map((e, i) => e + i * 17);
        drawString(context, "stroke", xs, ys, state.supplement);
        context.fillStyle = "white";
        drawString(context, "fill", xs, ys, state.supplement);
      }
      // コピーライト
      context.font = "bold 13px 'Kosugi Maru'";
      {
        context.strokeStyle = "rgb(100, 100, 100)";
        context.lineWidth = 4;
        const xs = Array((state.copyright.match(/\n/g) || []).length + 1)
          .fill(0)
          .map(
            (e, i) =>
              canvas.width / 2 +
              (canvas.width / 2 -
                context.measureText(state.copyright.split("\n")[i]).width -
                20),
          );
        const ys = Array((state.copyright.match(/\n/g) || []).length + 1)
          .fill(15)
          .map((e, i) => e + i * 17);
        drawString(context, "stroke", xs, ys, state.copyright);
        context.fillStyle = "white";
        drawString(context, "fill", xs, ys, state.copyright);
      }
      // セリフ
      context.lineWidth = 5;
      context.rotate(Math.PI / 50.0);
      {
        let x = 850;
        let x_ = 850;
        let y = 0;
        const xOffset = -35;
        const yOffset = 30;
        let start = 0;
        const rgb = convertHexToRgb(state.quoteColor);
        for (let i = 0; i < state.quote.length; ++i) {
          if (state.quote[i] === "\n") {
            x += xOffset;
            x_ -= xOffset;
            y = 0;
            start = 0;
            continue;
          }
          let xExtraOffset = 0;
          let yExtraOffset = 0;
          if (state.quote[i].match(/[、。,\.]/)) {
            xExtraOffset = Math.abs(xOffset) / 2;
            yExtraOffset = -Math.abs(yOffset) / 2;
          }
          if (state.quote[i].match(/[\'’]/)) {
            xExtraOffset = Math.abs(xOffset) / 2;
          }
          if (state.quote[i].match(/[a-zA-Z!\?]/)) {
            xExtraOffset = Math.abs(xOffset) / 5;
          }
          if (state.quote[i].match(/[っぁぃぅぇぉゃゅぉッァィゥェォャュョ]/)) {
            xExtraOffset = Math.abs(xOffset) / 10;
            yExtraOffset = -Math.abs(yOffset) / 7;
          }
          let font = "bold 30px 'Kosugi Maru'";
          if (state.quote[i].match(/[!！♪]/)) {
            font = "italic " + font;
          }
          context.font = font;
          if (
            state.quote[i].match(
              /[＝\=＿_￣ー\-―－～｜\|\[\]［］\{\}｛｝\(\)（）【】『』「」…]/,
            )
          ) {
            context.rotate(Math.PI / 2.0);
            context.strokeStyle = "white";
            context.strokeText(state.quote[i], y + start * yOffset, x_ - 1730);
            context.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
            context.fillText(state.quote[i], y + start * yOffset, x_ - 1730);
            context.rotate(-Math.PI / 2.0);
          } else {
            context.strokeStyle = "white";
            context.strokeText(
              state.quote[i],
              x + xExtraOffset,
              y + start * yOffset + yExtraOffset,
            );
            context.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
            context.fillText(
              state.quote[i],
              x + xExtraOffset,
              y + start * yOffset + yExtraOffset,
            );
          }
          start++;
        }
      }
      context.rotate(-Math.PI / 50.0);
    });
  };

  const saveImage = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "プリコネフレッシャー.png";
    a.click();
  };

  const selectBackgroundImage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    // 一度ダイアログで画像を選択した後に、もう一度ダイアログを開いてキャンセルすると本関数が呼ばれるがevent.target.files[0]がundefinedになるため
    if (!event.target.files || !event.target.files[0]) {
      return;
    }
    const reader = new FileReader();
    reader.readAsArrayBuffer(event.target.files[0]);
    reader.onload = (e: ProgressEvent<FileReader>): void => {
      const data = new Uint8Array(e.target?.result as ArrayBufferLike).subarray(
        0,
        12,
      );
      let header = "";
      for (let i = 0; i < data.length; ++i) {
        header += data[i].toString(16);
      }
      // png, jpg, webp
      if (
        /^89504e47/.test(header) ||
        /^ffd8ff/.test(header) ||
        /57454250$/.test(header)
      ) {
        const r = new FileReader();
        if (!event.target.files) {
          return;
        }
        r.readAsDataURL(event.target.files[0]);
        r.onload = () => {
          const image = document.createElement("img");
          image.src = r.result as string;
          image.addEventListener("load", () => {
            const canvas = document.getElementById(
              "canvas",
            ) as HTMLCanvasElement;
            canvas.width = 900;
            canvas.height = 500;
            let ratio;
            if (image.width === 900 && image.height === 500) {
              ratio = 1.0;
            } else if (1.8 <= (1.0 * image.width) / image.height) {
              ratio = (1.0 * canvas.height) / image.height;
            } else {
              ratio = (1.0 * canvas.width) / image.width;
            }
            image.width *= ratio;
            image.height *= ratio;
            setState({ ...state, externalBackgroundImage: image });
          });
        };
      }
    };
  };

  const onChange = (event: React.ChangeEvent<any>): void => {
    if (event.target.type === "checkbox") {
      setState((state) => ({
        ...state,
        [event.target.name]: event.target.checked,
      }));
      return;
    }
    setState((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const convertHexToRgb = (hex: string): number[] => {
    const c = [hex.substr(1, 2), hex.substr(3, 2), hex.substr(5, 2)];
    let rgb = [];
    for (let e of c) {
      let buf = 0;
      const weight = [16, 1];
      for (let i = 0; i < 2; ++i) {
        switch (e[i].toUpperCase()) {
          case "A":
            buf += 10 * weight[i];
            break;
          case "B":
            buf += 11 * weight[i];
            break;
          case "C":
            buf += 12 * weight[i];
            break;
          case "D":
            buf += 13 * weight[i];
            break;
          case "E":
            buf += 14 * weight[i];
            break;
          case "F":
            buf += 15 * weight[i];
            break;
          default:
            buf += parseInt(e[i]) * weight[i];
            break;
        }
      }
      rgb.push(buf);
    }
    return rgb;
  };

  const drawString = (
    context: CanvasRenderingContext2D,
    drawType: "fill" | "stroke",
    xs: number[],
    ys: number[],
    text: string,
  ): void => {
    let breakPos = 0;
    let row = 0;
    for (let i = 0; i < text.length; ++i) {
      if (text[i] === "\n") {
        if (drawType === "stroke") {
          context.strokeText(text.substring(breakPos, i), xs[row], ys[row]);
        } else {
          context.fillText(text.substring(breakPos, i), xs[row], ys[row]);
        }
        breakPos = i + 1;
        row++;
      }
      if (i === text.length - 1) {
        if (drawType === "stroke") {
          context.strokeText(text.substring(breakPos), xs[row], ys[row]);
        } else {
          context.fillText(text.substring(breakPos), xs[row], ys[row]);
        }
      }
    }
  };

  useEffect(() => {
    drawPreview();
  }, [state]);

  return (
    <div>
      <Form className="mt-3">
        <Accordion>
          <Accordion.Item eventKey="0" data-cy="backgroundImageList">
            <Accordion.Header>背景画像プリセット</Accordion.Header>
            <Accordion.Body>
              {/* Form.LabelにhtmlForを指定しているのでForm.GroupのcontrolIdの指定は不要 */}
              <Form.Group>
                <div className="row gy-3 row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 text-center">
                  {backGroundImageNames.map((value, index) => (
                    <div className="col" key={value}>
                      <Form.Label htmlFor={value}>
                        <Form.Check
                          type="radio"
                          name="backgroundImageName"
                          id={value}
                          data-cy={"backgroundImageName" + index}
                          value={value}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                          ) => {
                            setState({
                              ...state,
                              externalBackgroundImage:
                                null as unknown as HTMLImageElement,
                            });
                            onChange(event);
                          }}
                          checked={state.backgroundImageName === value}
                        />
                        <Image
                          src={"/img/" + value}
                          width={900}
                          height={500}
                          alt={value}
                        />
                      </Form.Label>
                    </div>
                  ))}
                </div>
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="mt-3">背景画像</div>
        <div className="row">
          <div className="col-sm-4 col-12">
            <Image
              src={
                state.externalBackgroundImage ??
                "/img/" + state.backgroundImageName
              }
              width={900}
              height={500}
              alt={state.backgroundImageName}
            />
          </div>
        </div>
        <Form.Group controlId="backgroundImageSelect" className="mt-3">
          <Form.Label>背景画像をファイルから選択</Form.Label>
          <Form.Control
            type="file"
            onChange={selectBackgroundImage}
            accept=".jpg,.jpeg,.png,.webp"
          />
        </Form.Group>
        <div className="alert alert-info mt-3 keep">
          画像は推奨サイズ(900×500)にトリミングされます
        </div>
        <Form.Group controlId="lootBoxId">
          <Form.Label>ガチャの種類</Form.Label>
          <Form.Control
            type="text"
            name="lootBoxType"
            data-cy="lootBoxType"
            value={state.lootBoxType}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group controlId="star" className="mt-3">
          <Form.Label>星</Form.Label>
          <Form.Select
            value={state.star}
            name="star"
            data-cy="star"
            onChange={onChange}
          >
            {[...Array(5)].map((_, index) => (
              <option key={index} value={index}>
                {"星" + (index + 1)}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Row>
          <Form.Group as={Col} controlId="characterName" className="mt-3">
            <Form.Label>キャラ名</Form.Label>
            <Form.Control
              type="text"
              name="characterName"
              data-cy="characterName"
              value={state.characterName}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="characterStyle" className="mt-3">
            <Form.Label>スタイル</Form.Label>
            <Form.Control
              type="text"
              name="characterStyle"
              data-cy="characterStyle"
              value={state.characterStyle}
              onChange={onChange}
            />
          </Form.Group>
        </Row>
        <Form.Group controlId="cv" className="mt-3">
          <Form.Label>CV</Form.Label>
          <Form.Control
            type="text"
            name="cv"
            data-cy="cv"
            value={state.cv}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group controlId="position" className="mt-3">
          <Form.Label>ポジション</Form.Label>
          <Form.Select
            name="position"
            data-cy="position"
            value={state.position}
            onChange={onChange}
          >
            {["前衛", "中衛", "後衛"].map((value, index) => (
              <option key={index} value={index}>
                {value}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="hp" className="mt-3">
          <Form.Label>HP</Form.Label>
          <Form.Control
            type="number"
            name="hp"
            data-cy="hp"
            value={state.hp}
            onChange={onChange}
          />
        </Form.Group>
        <Row>
          <Form.Group as={Col} controlId="attack" className="mt-3">
            <Form.Label>物理攻撃力</Form.Label>
            <Form.Control
              type="number"
              name="attack"
              data-cy="attack"
              value={state.attack}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="magicAttack" className="mt-3">
            <Form.Label>魔法攻撃力</Form.Label>
            <Form.Control
              type="number"
              name="magicAttack"
              data-cy="magicAttack"
              value={state.magicAttack}
              onChange={onChange}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="defense" className="mt-3">
            <Form.Label>物理防御力</Form.Label>
            <Form.Control
              type="number"
              name="defense"
              data-cy="defense"
              value={state.defense}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="magicDefense" className="mt-3">
            <Form.Label>魔法防御力</Form.Label>
            <Form.Control
              type="number"
              name="magicDefense"
              data-cy="magicDefense"
              value={state.magicDefense}
              onChange={onChange}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="rank" className="mt-3">
            <Form.Label>ランク</Form.Label>
            <Form.Control
              type="number"
              name="rank"
              data-cy="rank"
              value={state.rank}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="level" className="mt-3">
            <Form.Label>レベル</Form.Label>
            <Form.Control
              type="number"
              name="level"
              data-cy="level"
              value={state.level}
              onChange={onChange}
            />
          </Form.Group>
        </Row>
        <Form.Group controlId="description" className="mt-3">
          <Form.Label>キャラ説明</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={state.description}
            onChange={onChange}
            name="description"
            data-cy="description"
          />
        </Form.Group>
        <Form.Group controlId="quote" className="mt-3">
          <Form.Label>セリフ</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={state.quote}
            onChange={onChange}
            name="quote"
            data-cy="quote"
          />
        </Form.Group>
        <Form.Group controlId="copyright" className="mt-3">
          <Form.Label>
            コピーライト{" "}
            <span className="text-warning">
              (実在する人物・団体・企業などのそれと誤解され得る記述は推奨しません)
            </span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={state.copyright}
            onChange={onChange}
            name="copyright"
            data-cy="copyright"
          />
        </Form.Group>
        <Form.Group controlId="supplement" className="mt-3">
          <Form.Label>補足</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={state.supplement}
            onChange={onChange}
            name="supplement"
            data-cy="supplement"
          />
        </Form.Group>
        <Form.Group controlId="ribbonColor" className="mt-3">
          <Form.Label>リボンの色</Form.Label>
          <Form.Control
            type="color"
            name="ribbonColor"
            data-cy="ribbonColor"
            value={state.ribbonColor}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group controlId="statusAndDescriptionColor" className="mt-3">
          <Form.Label>ステータスとキャラ説明の色</Form.Label>
          <Form.Control
            type="color"
            name="statusAndDescriptionColor"
            data-cy="statusAndDescriptionColor"
            value={state.statusAndDescriptionColor}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group controlId="quoteColor" className="mt-3">
          <Form.Label>セリフの色</Form.Label>
          <Form.Control
            type="color"
            name="quoteColor"
            data-cy="quoteColor"
            value={state.quoteColor}
            onChange={onChange}
          />
        </Form.Group>
        <hr />
        <button
          type="button"
          className="btn btn-outline-dark mt-3 d-block"
          onClick={saveImage}
        >
          画像を保存
        </button>
      </Form>
      <div className="alert alert-info mt-3 keep">
        ボタンが動作しない時はプレビューを保存するか別ブラウザを使用してください
      </div>
      <div className="uk-form-label">プレビュー</div>
      <canvas
        id="canvas"
        width="900"
        height="500"
        className={style.canvas}
      ></canvas>
    </div>
  );
};

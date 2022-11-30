import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import { LocationMarkerIcon, PhoneIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { confirmPresence, getGuest } from "../services/firebase";
import Clipboard from 'react-clipboard.js';

const Home: NextPage = () => {
  const [phone, setPhone] = useState(String);
  const [guest, setGuest] = useState(Object);
  const [err, setErr] = useState(String);

  async function verifyCookie() {
    const { "convite-digital": cookie } = parseCookies();
    if (cookie) {
      const guest = await getGuest(cookie);
      setGuest(guest);
      setPhone(guest?.phone);
    } else {
      Router.push("/");
    }
  }
  useEffect(() => {
    verifyCookie();
  }, [phone]);

  const cancelConfirmation = async () => {
    const result = await confirmPresence(phone, "cancel");
    if (result) {

      destroyCookie(null, "convite-digital");
      alert(
        "Presença Desconfirmada: Lamentamos que não possar celebrar conosco."
      );
      setPhone("");
      return;
    } else {
      return setErr("Erro ao cancelar. Tente mais tarde!");
    }
  };
  const location = {
    lat: "-8.9728236",
    long: "13.1502776",
  };

  const mapMapUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat}%2C${location.long}`;
  return (
     <div className= "flex flex-col items-center justify-center min-h-screen text-white bg-center bg-cover bg-bg main-container">
      <Head>
        <title>Convite digital</title>
        <link rel="icon" href="/Logo.png" />
      </Head>
       
      <section className="flex flex-col justify-center flex-1 w-full max-w-100 l-451 ">

      
        <div className="flex justify-center flex-row mt-[83px] ">
          <img alt="Flores à direita do nome" src="/Flowers_left.png" className="w-24 h-[10rem] "></img>
          <h1 className="z-10 sm:mt-[35px] md:mt-[55px] italic text-[35px] text-center font-lucida_calligraphy  ">Cíntia Alexandre</h1>
          <img alt="Flores à esquerda do nome" src="/Flowers_right.png" className="w-24 h-37 pr-[-10px]"></img>
        </div>

        <div className="flex flex-col mt-[-40px] text-center align-middle">
        <p className="text-[96px] align-center font-lucida_bright">18</p>
        </div>

        <div className="flex flex-col mt-0 space-y-2 text-center align-middle">
          <p className="text-[22px] font-lucida_calligraphy">Birthday</p>
          <p className="text-md font-lucida_bright">03/12</p>
          <p className="font-lucida_bright text-md">17:00</p>
        </div>

        <div className="flex flex-row justify-center mt-3 text-center align-middle">
        <p className="text-[90px] ml-[-10px] font-lucida_calligraphy mr-0">“</p>
        <p className="pt-6 ml-[-4px] w-[250px] text-b font-lucida_bright text-center underline-offset-2">
        Recarregue a sua energia e venha celebrar comigo!
          </p>
        </div>
        </section>
      <main className="flex flex-col justify-start flex-1 w-full max-w-md px-5 pt-5 text-center">
        <div className="flex flex-col mt-4 font-lucida_bright">
          <p>
            Olá {guest?.name}, obrigado por ter confirmado a sua presença. Evite chegar depois das 18h porque a comida acaba e não te esqueças do presente.
            <strong> DRESSCODE: rapazes camisa social e meninas vestidos casuais. </strong>
          </p>
          <div
            onClick={cancelConfirmation}
            className="flex justify-center flex-1 w-1/2 p-5 mx-auto mt-5 text-red-500 align-middle transition-all border-2 border-red-500 cursor-pointer lg:w-full hover:bg-red-600"
          >
            Desconfirmar
          </div>
        </div>
        
        <div>
          <div className="flex flex-col mt-16 ">
          <img alt="Localização" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/114/round-pushpin_1f4cd.png" className="self-center block w-6 h-6"></img>
            <p className="relative justify-center mt-5 font-lucida_bright">
            Rua P, frente ao Condomínio Kuditemo.
            </p>
            <a
                className="self-center mt-1 ml-1 "
                href={mapMapUrl}
              >
                {" "}
                <p className="inline font-medium text-white border-b border-white font-lucida_bright ottom-0">Ver no mapa</p>
                <img alt="" src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik0xMTguMjUsMTAuNzVjLTE3Ljc2MjcsMCAtMzIuMjUsMTQuNDg3MyAtMzIuMjUsMzIuMjVjMCwxMS45Njc3NyA3LjQzMjYxLDI0LjIyOTQ5IDE0LjM2MTMzLDM0LjI2NTYzYzYuOTcwNywxMC4wNzgxMyAxMy44OTk0MSwxNy43MjA3MSAxMy44OTk0MSwxNy43MjA3MWMxLjA0OTgxLDEuMTMzNzggMi40Nzc1NCwxLjc2MzY3IDMuOTg5MjYsMS43NjM2N2MxLjUxMTcyLDAgMi45Mzk0NiwtMC42Mjk4OSAzLjk4OTI2LC0xLjc2MzY3YzAsMCA2LjkyODcxLC03LjY0MjU4IDEzLjg1NzQyLC0xNy43MjA3MWM2Ljk3MDcxLC0xMC4wMzYxNCAxNC40MDMzMiwtMjIuMjk3ODUgMTQuNDAzMzIsLTM0LjI2NTYyYzAsLTE3Ljc2MjcgLTE0LjQ4NzMsLTMyLjI1IC0zMi4yNSwtMzIuMjV6TTExOC4yNSwyMS41YzExLjkyNTc4LDAgMjEuNSw5LjU3NDIyIDIxLjUsMjEuNWMwLDYuODQ0NzMgLTYuMDA0ODksMTguNzcwNTEgLTEyLjQ3MTY4LDI4LjIxODc1Yy00LjUzNTE2LDYuNTA4NzkgLTYuNjc2NzYsOC43NzYzNiAtOS4wMjgzMiwxMS41MDU4NmMtMi4zNTE1NiwtMi43Mjk1IC00LjQ5MzE3LC00Ljk5NzA3IC05LjAyODMyLC0xMS41MDU4NmMtNi40NjY3OSwtOS40NDgyNCAtMTIuNDcxNjgsLTIxLjM3NDAyIC0xMi40NzE2OCwtMjguMjE4NzVjMCwtMTEuOTI1NzggOS41NzQyMiwtMjEuNSAyMS41LC0yMS41ek02MC40MjY3NiwyMS42Njc5N2MtMC45MjM4MywtMC4yNTE5NSAtMS44ODk2NSwtMC4yNTE5NSAtMi43Mjk0OSwwLjA0MTk5bC00MywxMi4wOTM3NWMtMi4zNTE1NiwwLjYyOTg5IC0zLjk0NzI3LDIuNzcxNDkgLTMuOTQ3MjcsNS4xNjUwNHYxMDAuNjEzMjhjMCwzLjM1OTM4IDEuNTExNzIsNi40MjQ4IDQuMTE1MjQsOC40ODI0M2MyLjY0NTUsMi4wNTc2MSA2LjAwNDg3LDIuNzI5NDkgOS40MDYyNSwxLjg4OTY1bDM0LjkzNzUsLTEwLjAzNjE0bDQxLjYxNDI1LDEwLjQxNDA2YzAuNDE5OTMsMC4xMjU5OCAwLjg4MTg0LDAuMTY3OTcgMS4zMDE3NiwwLjE2Nzk3YzAuNTAzOTEsMCAwLjk2NTgyLC0wLjA4Mzk4IDEuNDY5NzMsLTAuMjA5OTZsNDMsLTEyLjI2MTcyYzIuMzA5NTcsLTAuNjI5ODkgMy45MDUyNywtMi43NzE0OSAzLjkwNTI3LC01LjE2NTA0di01OC4xMTcxOWMtMy40ODUzNSw1LjkyMDkgLTcuMjIyNjYsMTEuMzM3OSAtMTAuNzUsMTUuOTU3MDN2MzguMTI4OTFsLTMyLjI1LDkuMTk2Mjl2LTM0LjcyNzU0Yy0wLjM3NzkzLC0wLjM3NzkzIC0wLjgzOTg0LC0wLjY3MTg3IC0xLjE3NTc4LC0xLjA5MTc5Yy0yLjA5OTYsLTIuMzA5NTcgLTUuNjY4OTUsLTYuNDI0ODEgLTkuNTc0MjIsLTExLjUwNTg2djQ3LjUzNTE2bC0zMi4yNSwtOC4wNjI1di05Ni40MTQwNmwxMS40MjE4OCwyLjg1NTQ3YzAuMjA5OTYsLTEuNDY5NzMgMC40NjE5MiwtMi44OTc0NiAwLjgzOTg0LC00LjI4MzJjMC40MTk5MywtMS45MzE2NSAxLjAwNzgxLC0zLjc3OTMgMS43MjE2OCwtNS41NDI5N2MwLjA4Mzk5LC0wLjIwOTk3IDAuMDgzOTksLTAuMzc3OTQgMC4xNjc5NywtMC41ODc5ek0xMTguMjUsMzIuMjVjLTUuOTIwOSwwIC0xMC43NSw0LjgyOTEgLTEwLjc1LDEwLjc1YzAsNS45MjA5IDQuODI5MSwxMC43NSAxMC43NSwxMC43NWM1LjkyMDksMCAxMC43NSwtNC44MjkxIDEwLjc1LC0xMC43NWMwLC01LjkyMDkgLTQuODI5MSwtMTAuNzUgLTEwLjc1LC0xMC43NXpNNTMuNzUsMzMuOTcxNjh2OTYuMzcyMDdsLTMyLjI1LDkuMjM4Mjh2LTk2LjU0MDA0eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+" className="inline w-6 h-6 ml-2"></img>
              </a>
          </div>

          <div className="flex flex-col mt-16 ">
          <img alt="Contacto" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/21/black-telephone_260e.png" className="self-center block w-6 h-6"></img>
            <p className="relative justify-center mt-5 font-lucida_bright">
            +244 923640567 (Dona Carla)
            </p>
            <Clipboard data-clipboard-text="+244 923492663">
        <p className="inline font-medium text-white border-b border-white font-lucida_bright ottom-0">Copiar</p>
        <img alt="" src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik01Ni40Mzc1LDEuMzQzNzVjLTIuMjg0MzgsMCAtNC4wMzEyNSwxLjc0Njg3IC00LjAzMTI1LDQuMDMxMjVjMCwyLjI4NDM3IDEuNzQ2ODcsNC4wMzEyNSA0LjAzMTI1LDQuMDMxMjVoNzIuNTYyNWMxMi42MzEyNSwwIDIyLjg0Mzc1LDEwLjIxMjUgMjIuODQzNzUsMjIuODQzNzV2MTEyLjg3NWMwLDIuMjg0MzggMS43NDY4Nyw0LjAzMTI1IDQuMDMxMjUsNC4wMzEyNWMyLjI4NDM4LDAgNC4wMzEyNSwtMS43NDY4NyA0LjAzMTI1LC00LjAzMTI1di0xMTIuODc1YzAsLTE3LjA2NTYyIC0xMy44NDA2MiwtMzAuOTA2MjUgLTMwLjkwNjI1LC0zMC45MDYyNXpNMzQuOTM3NSwyMi44NDM3NWMtOS42NzUsMCAtMTcuNDY4NzUsNy43OTM3NSAtMTcuNDY4NzUsMTcuNDY4NzV2MTEyLjg3NWMwLDkuNjc1IDcuNzkzNzUsMTcuNDY4NzUgMTcuNDY4NzUsMTcuNDY4NzVoODZjOS42NzUsMCAxNy40Njg3NSwtNy43OTM3NSAxNy40Njg3NSwtMTcuNDY4NzV2LTgwLjYyNWMwLC0yLjI4NDM3IC0xLjc0Njg3LC00LjAzMTI1IC00LjAzMTI1LC00LjAzMTI1Yy0yLjI4NDM4LDAgLTQuMDMxMjUsMS43NDY4OCAtNC4wMzEyNSw0LjAzMTI1djgwLjYyNWMwLDUuMjQwNjIgLTQuMTY1NjIsOS40MDYyNSAtOS40MDYyNSw5LjQwNjI1aC04NmMtNS4yNDA2MiwwIC05LjQwNjI1LC00LjE2NTYzIC05LjQwNjI1LC05LjQwNjI1di0xMTIuODc1YzAsLTUuMjQwNjMgNC4xNjU2MywtOS40MDYyNSA5LjQwNjI1LC05LjQwNjI1aDY4LjUzMTI1djkuNDA2MjVjMCw5LjY3NSA3Ljc5Mzc1LDE3LjQ2ODc1IDE3LjQ2ODc1LDE3LjQ2ODc1aDEzLjQzNzVjMi4yODQzOCwwIDQuMDMxMjUsLTEuNzQ2ODcgNC4wMzEyNSwtNC4wMzEyNWMwLC04LjE5Njg3IC0zLjIyMzk1LC0xNS45OTE2NyAtOS4wMDIwOCwtMjEuOTA0MTdjLTUuOTEyNSwtNS43NzgxMyAtMTMuNzA3MywtOS4wMDIwOCAtMjEuOTA0MTcsLTkuMDAyMDh6TTExMS41MzEyNSwzMS4zMTA0MmM0LjU2ODc1LDAuODA2MjUgOC43MzQzOCwyLjk1NTIgMTIuMDkzNzUsNi4zMTQ1OGMzLjM1OTM4LDMuMzU5MzggNS41MDgzMyw3LjUyNSA2LjMxNDU4LDEyLjA5Mzc1aC05LjAwMjA4Yy01LjI0MDYzLDAgLTkuNDA2MjUsLTQuMTY1NjIgLTkuNDA2MjUsLTkuNDA2MjV6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=" className="inline w-5 h-5 ml-2"></img>
      </Clipboard>
      <p className="relative justify-center mt-5 font-lucida_bright">
            +244 992926193 (Cíntia Alexandre)
            </p>
            <Clipboard data-clipboard-text="+244 923492663">
        <p className="inline font-medium text-white border-b border-white font-lucida_bright ottom-0">Copiar</p>
        <img alt="" src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik01Ni40Mzc1LDEuMzQzNzVjLTIuMjg0MzgsMCAtNC4wMzEyNSwxLjc0Njg3IC00LjAzMTI1LDQuMDMxMjVjMCwyLjI4NDM3IDEuNzQ2ODcsNC4wMzEyNSA0LjAzMTI1LDQuMDMxMjVoNzIuNTYyNWMxMi42MzEyNSwwIDIyLjg0Mzc1LDEwLjIxMjUgMjIuODQzNzUsMjIuODQzNzV2MTEyLjg3NWMwLDIuMjg0MzggMS43NDY4Nyw0LjAzMTI1IDQuMDMxMjUsNC4wMzEyNWMyLjI4NDM4LDAgNC4wMzEyNSwtMS43NDY4NyA0LjAzMTI1LC00LjAzMTI1di0xMTIuODc1YzAsLTE3LjA2NTYyIC0xMy44NDA2MiwtMzAuOTA2MjUgLTMwLjkwNjI1LC0zMC45MDYyNXpNMzQuOTM3NSwyMi44NDM3NWMtOS42NzUsMCAtMTcuNDY4NzUsNy43OTM3NSAtMTcuNDY4NzUsMTcuNDY4NzV2MTEyLjg3NWMwLDkuNjc1IDcuNzkzNzUsMTcuNDY4NzUgMTcuNDY4NzUsMTcuNDY4NzVoODZjOS42NzUsMCAxNy40Njg3NSwtNy43OTM3NSAxNy40Njg3NSwtMTcuNDY4NzV2LTgwLjYyNWMwLC0yLjI4NDM3IC0xLjc0Njg3LC00LjAzMTI1IC00LjAzMTI1LC00LjAzMTI1Yy0yLjI4NDM4LDAgLTQuMDMxMjUsMS43NDY4OCAtNC4wMzEyNSw0LjAzMTI1djgwLjYyNWMwLDUuMjQwNjIgLTQuMTY1NjIsOS40MDYyNSAtOS40MDYyNSw5LjQwNjI1aC04NmMtNS4yNDA2MiwwIC05LjQwNjI1LC00LjE2NTYzIC05LjQwNjI1LC05LjQwNjI1di0xMTIuODc1YzAsLTUuMjQwNjMgNC4xNjU2MywtOS40MDYyNSA5LjQwNjI1LC05LjQwNjI1aDY4LjUzMTI1djkuNDA2MjVjMCw5LjY3NSA3Ljc5Mzc1LDE3LjQ2ODc1IDE3LjQ2ODc1LDE3LjQ2ODc1aDEzLjQzNzVjMi4yODQzOCwwIDQuMDMxMjUsLTEuNzQ2ODcgNC4wMzEyNSwtNC4wMzEyNWMwLC04LjE5Njg3IC0zLjIyMzk1LC0xNS45OTE2NyAtOS4wMDIwOCwtMjEuOTA0MTdjLTUuOTEyNSwtNS43NzgxMyAtMTMuNzA3MywtOS4wMDIwOCAtMjEuOTA0MTcsLTkuMDAyMDh6TTExMS41MzEyNSwzMS4zMTA0MmM0LjU2ODc1LDAuODA2MjUgOC43MzQzOCwyLjk1NTIgMTIuMDkzNzUsNi4zMTQ1OGMzLjM1OTM4LDMuMzU5MzggNS41MDgzMyw3LjUyNSA2LjMxNDU4LDEyLjA5Mzc1aC05LjAwMjA4Yy01LjI0MDYzLDAgLTkuNDA2MjUsLTQuMTY1NjIgLTkuNDA2MjUsLTkuNDA2MjV6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=" className="inline w-5 h-5 ml-2"></img>
      </Clipboard>
      <p className="relative justify-center mt-5 font-lucida_bright">
            +244 947389194 (Cíntia Alexandre)
            </p>
            <Clipboard data-clipboard-text="+244 923492663">
        <p className="inline font-medium text-white border-b border-white font-lucida_bright ottom-0">Copiar</p>
        <img alt="" src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik01Ni40Mzc1LDEuMzQzNzVjLTIuMjg0MzgsMCAtNC4wMzEyNSwxLjc0Njg3IC00LjAzMTI1LDQuMDMxMjVjMCwyLjI4NDM3IDEuNzQ2ODcsNC4wMzEyNSA0LjAzMTI1LDQuMDMxMjVoNzIuNTYyNWMxMi42MzEyNSwwIDIyLjg0Mzc1LDEwLjIxMjUgMjIuODQzNzUsMjIuODQzNzV2MTEyLjg3NWMwLDIuMjg0MzggMS43NDY4Nyw0LjAzMTI1IDQuMDMxMjUsNC4wMzEyNWMyLjI4NDM4LDAgNC4wMzEyNSwtMS43NDY4NyA0LjAzMTI1LC00LjAzMTI1di0xMTIuODc1YzAsLTE3LjA2NTYyIC0xMy44NDA2MiwtMzAuOTA2MjUgLTMwLjkwNjI1LC0zMC45MDYyNXpNMzQuOTM3NSwyMi44NDM3NWMtOS42NzUsMCAtMTcuNDY4NzUsNy43OTM3NSAtMTcuNDY4NzUsMTcuNDY4NzV2MTEyLjg3NWMwLDkuNjc1IDcuNzkzNzUsMTcuNDY4NzUgMTcuNDY4NzUsMTcuNDY4NzVoODZjOS42NzUsMCAxNy40Njg3NSwtNy43OTM3NSAxNy40Njg3NSwtMTcuNDY4NzV2LTgwLjYyNWMwLC0yLjI4NDM3IC0xLjc0Njg3LC00LjAzMTI1IC00LjAzMTI1LC00LjAzMTI1Yy0yLjI4NDM4LDAgLTQuMDMxMjUsMS43NDY4OCAtNC4wMzEyNSw0LjAzMTI1djgwLjYyNWMwLDUuMjQwNjIgLTQuMTY1NjIsOS40MDYyNSAtOS40MDYyNSw5LjQwNjI1aC04NmMtNS4yNDA2MiwwIC05LjQwNjI1LC00LjE2NTYzIC05LjQwNjI1LC05LjQwNjI1di0xMTIuODc1YzAsLTUuMjQwNjMgNC4xNjU2MywtOS40MDYyNSA5LjQwNjI1LC05LjQwNjI1aDY4LjUzMTI1djkuNDA2MjVjMCw5LjY3NSA3Ljc5Mzc1LDE3LjQ2ODc1IDE3LjQ2ODc1LDE3LjQ2ODc1aDEzLjQzNzVjMi4yODQzOCwwIDQuMDMxMjUsLTEuNzQ2ODcgNC4wMzEyNSwtNC4wMzEyNWMwLC04LjE5Njg3IC0zLjIyMzk1LC0xNS45OTE2NyAtOS4wMDIwOCwtMjEuOTA0MTdjLTUuOTEyNSwtNS43NzgxMyAtMTMuNzA3MywtOS4wMDIwOCAtMjEuOTA0MTcsLTkuMDAyMDh6TTExMS41MzEyNSwzMS4zMTA0MmM0LjU2ODc1LDAuODA2MjUgOC43MzQzOCwyLjk1NTIgMTIuMDkzNzUsNi4zMTQ1OGMzLjM1OTM4LDMuMzU5MzggNS41MDgzMyw3LjUyNSA2LjMxNDU4LDEyLjA5Mzc1aC05LjAwMjA4Yy01LjI0MDYzLDAgLTkuNDA2MjUsLTQuMTY1NjIgLTkuNDA2MjUsLTkuNDA2MjV6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=" className="inline w-5 h-5 ml-2"></img>
      </Clipboard>
          </div>
          
          <div className="bottom-0 left-0 right-0 flex flex-col items-center justify-center mt-16">
            <img alt="Figurinha da Marlyin Monroe" src="/model.gif" className="mb-[-27px] w-[38px] h-[47px] z-10"></img>
            <a href="">
            <img alt="Convite Digital" src="/convite_digital.png" className="w-[100px] h-[100px] z-0"></img>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

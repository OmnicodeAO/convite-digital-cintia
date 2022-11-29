/* This example requires Tailwind CSS v2.0+ */
import { PaperClipIcon } from "@heroicons/react/solid";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { listGuests } from "../../../services/firebase";
export default function List() {
  const [list, setList] = useState([]);
  const handleGuestList = async () => {
    const result = await listGuests();
    setList(result);
  };
  const route = useRouter();
  useEffect(() => {
    handleGuestList();
  }, []);
  return (
    <>
      <Head>
        <title>Convite Digital - Convidados</title>
        <link rel="icon" href="/tapago.svg" />
      </Head>
      <div className="mb-5 overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Festa de aniversário de @Cíntia
          </h3>
          <p className="max-w-2xl mt-1 text-sm text-gray-500">
            Lista de convidados
          </p>
        </div>
        <div className="relative overflow-x-auto border-t border-gray-200">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="mt-5 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nome
                </th>
                <th scope="col" className="px-6 py-3">
                  Convidado por
                </th>
                <th scope="col" className="px-6 py-3">
                  Contato
                </th>
              </tr>
            </thead>
            <tbody>
              {list.length > 0 &&
                list.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.name}
                    </th>
                    <td className="px-6 py-4">{item.invitedby}</td>
                    <td className="px-6 py-4">{item.phone}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between">
        <a
          onClick={() => route.back()}
          className="px-5 text-gray-700 cursor-pointer "
        >
          Voltar
        </a>
        <a
          onClick={() => route.push("/admin")}
          className="px-5 font-medium text-blue-500 cursor-pointer"
        >
          Adicionar outro
        </a>
      </div>
    </>
  );
}

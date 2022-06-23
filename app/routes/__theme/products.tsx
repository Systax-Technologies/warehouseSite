import { CubeIcon, HomeIcon, UserCircleIcon, UserGroupIcon } from "@heroicons/react/solid";

export default function Products() {
  return <>
  <div className=" row-span-full px-44 pt-16 pb-32">
    <h3>Products</h3>
  </div>
  <div className=" grid grid-cols-3">
  <div className=""></div>
  <div  className=" pl-52 col-span-full">
    <List/>
  </div>
  <div  className=""/>
  </div>
  </>;
}

function List(){
  return(
    <div className=" max-w-screen-md justify-items-center align flex flex-col">
<ListElement/>
<ListElement/>
<ListElement/>
<ListElement/>

    </div>
  )
}

function ListElement(){
  return(
    <div className="flex flex-row justify-around w-auto drop-shadow-sm pb-2">
      <div className={css}>cose</div>
      <div className={css}>cose</div>
      <div className={css}>cose</div>
      <div className={css}>cose di nuovo</div>
      <div className={css}>cose di nuovo</div>
    </div>
  )
}

const css="flex  align-middle py-4 px-4 w-72 h-16 bg-white border-2 border-l-slate-400"
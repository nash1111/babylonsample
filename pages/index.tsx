import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Link href="/square"> <a>赤い平面</a> </Link>
      <br />
      <Link href="/ball"> <a>球体と平面</a> </Link>
      <br />
      <Link href="/kusoinakabuilding"> <a>家</a> </Link>
    </>
  )
}

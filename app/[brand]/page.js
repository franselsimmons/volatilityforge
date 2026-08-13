//file: app/[brand]/page.js

import { notFound } from 'next/navigation';
import BrandClient from '../../components/BrandClient';
import { BRANDS } from '../../lib/brands';

export default async function BrandPage({ params }) {
  const { brand } = await params;
  if (!BRANDS[brand]) notFound();
  return <BrandClient slug={brand} brand={BRANDS[brand]} />;
}

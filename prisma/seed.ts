import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // 1. Create realistic Stores
  const storesData = [
    { name: 'Target', address: '123 Main St', city: 'Anytown', state: 'CA', zipCode: '12345', latitude: 34.05, longitude: -118.25 },
    { name: 'Walmart', address: '456 Elm St', city: 'Othertown', state: 'CA', zipCode: '12346', latitude: 34.06, longitude: -118.26 },
    { name: 'Whole Foods', address: '789 Oak St', city: 'Uptown', state: 'CA', zipCode: '12347', latitude: 34.07, longitude: -118.27 },
    { name: 'Trader Joes', address: '321 Pine St', city: 'Downtown', state: 'CA', zipCode: '12348', latitude: 34.08, longitude: -118.28 },
  ]

  const stores = []
  for (const s of storesData) {
    const store = await prisma.store.create({
      data: s
    })
    stores.push(store)
  }

  // 2. Create Products
  const productsData = [
    { name: 'Organic Whole Milk', category: 'Dairy', barcode: '111001' },
    { name: 'Large Eggs (12ct)', category: 'Dairy', barcode: '111002' },
    { name: 'Sourdough Bread', category: 'Bakery', barcode: '111003' },
    { name: 'Avocado', category: 'Produce', barcode: '111004' },
    { name: 'Ground Beef (1lb)', category: 'Meat', barcode: '111005' },
    { name: 'Pasta Sauce', category: 'Pantry', barcode: '111006' },
  ]

  // 3. Generate Prices (Good, Fair, Poor, and Outlier examples)
  for (const p of productsData) {
    const product = await prisma.product.upsert({
      where: { barcode: p.barcode },
      update: {},
      create: p,
    })

    console.log(`Seeding prices for ${p.name}...`)

    // Generate 15-20 price points across different stores and dates
    const numPrices = 15 + Math.floor(Math.random() * 6)
    // Base price between ₹50 and ₹400
    const basePrice = 50 + Math.random() * 350

    for (let i = 0; i < numPrices; i++) {
      // Random variance +/- 20%
      let amount = basePrice * (0.8 + Math.random() * 0.4)

      // Occasional outlier (10% chance)
      if (Math.random() < 0.1) {
        amount = basePrice * 2.5 // Way too expensive
      }

      const randomStore = stores[Math.floor(Math.random() * stores.length)]
      const daysAgo = Math.floor(Math.random() * 60) // Last 60 days
      const date = new Date()
      date.setDate(date.getDate() - daysAgo)

      await prisma.price.create({
        data: {
          productId: product.id,
          storeId: randomStore.id,
          amount: parseFloat(amount.toFixed(2)),
          createdAt: date,
          verified: true
        }
      })
    }
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

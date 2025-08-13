import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌟 Seeding database with military bases...');

  // Sample military bases data
  const bases = [
    {
      name: 'Fort Bragg',
      location: 'North Carolina'
    },
    {
      name: 'Fort Campbell',
      location: 'Kentucky'
    },
    {
      name: 'Fort Hood',
      location: 'Texas'
    },
    {
      name: 'Fort Bliss',
      location: 'Texas'
    },
    {
      name: 'Fort Stewart',
      location: 'Georgia'
    },
    {
      name: 'Fort Campbell',
      location: 'Kentucky'
    },
    {
      name: 'Fort Drum',
      location: 'New York'
    },
    {
      name: 'Fort Carson',
      location: 'Colorado'
    },
    {
      name: 'Fort Lewis',
      location: 'Washington'
    },
    {
      name: 'Fort Riley',
      location: 'Kansas'
    },
    {
      name: 'Fort Benning',
      location: 'Georgia'
    },
    {
      name: 'Fort Polk',
      location: 'Louisiana'
    },
    {
      name: 'Camp Lejeune',
      location: 'North Carolina'
    },
    {
      name: 'Camp Pendleton',
      location: 'California'
    },
    {
      name: 'Camp Humphreys',
      location: 'South Korea'
    },
    {
      name: 'Fort Meade',
      location: 'Maryland'
    },
    {
      name: 'Fort Gordon',
      location: 'Georgia'
    },
    {
      name: 'Fort Jackson',
      location: 'South Carolina'
    },
    {
      name: 'Fort Knox',
      location: 'Kentucky'
    },
    {
      name: 'Fort Rucker',
      location: 'Alabama'
    },
    {
      name: 'Naval Base San Diego',
      location: 'California'
    },
    {
      name: 'Naval Station Norfolk',
      location: 'Virginia'
    },
    {
      name: 'Naval Base Kitsap',
      location: 'Washington'
    },
    {
      name: 'Naval Station Mayport',
      location: 'Florida'
    },
    {
      name: 'Naval Station Pearl Harbor',
      location: 'Hawaii'
    },
    {
      name: 'Marine Corps Base Camp Lejeune',
      location: 'North Carolina'
    },
    {
      name: 'Marine Corps Base Camp Pendleton',
      location: 'California'
    },
    {
      name: 'Marine Corps Base Quantico',
      location: 'Virginia'
    },
    {
      name: 'Marine Corps Base Hawaii',
      location: 'Hawaii'
    },
    {
      name: 'Offutt Air Force Base',
      location: 'Nebraska'
    },
    {
      name: 'Langley Air Force Base',
      location: 'Virginia'
    },
    {
      name: 'Dover Air Force Base',
      location: 'Delaware'
    },
    {
      name: 'Travis Air Force Base',
      location: 'California'
    },
    {
      name: 'McChord Air Force Base',
      location: 'Washington'
    },
    {
      name: 'Peterson Air Force Base',
      location: 'Colorado'
    },
    {
      name: 'Holloman Air Force Base',
      location: 'New Mexico'
    },
    {
      name: 'Laughlin Air Force Base',
      location: 'Texas'
    },
    {
      name: 'Sheppard Air Force Base',
      location: 'Texas'
    },
    {
      name: 'Luke Air Force Base',
      location: 'Arizona'
    },
    {
      name: 'Tyndall Air Force Base',
      location: 'Florida'
    },
    {
      name: 'Eglin Air Force Base',
      location: 'Florida'
    },
    {
      name: 'Whiteman Air Force Base',
      location: 'Missouri'
    },
    {
      name: 'Minot Air Force Base',
      location: 'North Dakota'
    },
    {
      name: 'Andrews Air Force Base',
      location: 'Maryland'
    },
    {
      name: 'Joint Base Lewis-McChord',
      location: 'Washington'
    },
    {
      name: 'Joint Base San Antonio',
      location: 'Texas'
    },
    {
      name: 'Joint Base Elmendorf-Richardson',
      location: 'Alaska'
    },
    {
      name: 'Joint Base Langley-Eustis',
      location: 'Virginia'
    },
    {
      name: 'Joint Base Charleston',
      location: 'South Carolina'
    },
    {
      name: 'Joint Base Andrews',
      location: 'Maryland'
    },
    {
      name: 'Joint Base McGuire-Dix-Lakehurst',
      location: 'New Jersey'
    },
    {
      name: 'Coast Guard Base Alameda',
      location: 'California'
    },
    {
      name: 'Coast Guard Base Boston',
      location: 'Massachusetts'
    },
    {
      name: 'Coast Guard Base Miami',
      location: 'Florida'
    },
    {
      name: 'Coast Guard Base Seattle',
      location: 'Washington'
    },
    {
      name: 'Coast Guard Base Portsmouth',
      location: 'Virginia'
    },
    {
      name: 'Coast Guard Base Kodiak',
      location: 'Alaska'
    },
    {
      name: 'Coast Guard Base Cape May',
      location: 'New Jersey'
    },
    {
      name: 'Coast Guard Base New Orleans',
      location: 'Louisiana'
    },
    {
      name: 'Coast Guard Base San Pedro',
      location: 'California'
    },
    {
      name: 'Coast Guard Base Galveston',
      location: 'Texas'
    },
    {
      name: 'Coast Guard Base Key West',
      location: 'Florida'
    },
    {
      name: 'Coast Guard Base Miami Beach',
      location: 'Florida'
    },
    {
      name: 'Coast Guard Base St. Petersburg',
      location: 'Florida'
    },
    {
      name: 'Coast Guard Base Mobile',
      location: 'Alabama'
    },
    {
      name: 'Coast Guard Base Charleston',
      location: 'South Carolina'
    },
    {
      name: 'Coast Guard Base Portsmouth',
      location: 'Virginia'
    },
    {
      name: 'Coast Guard Base Seattle',
      location: 'Washington'
    },
    {
      name: 'Coast Guard Base Kodiak',
      location: 'Alaska'
    },
    {
      name: 'Coast Guard Base Honolulu',
      location: 'Hawaii'
    },
    {
      name: 'Coast Guard Base Guam',
      location: 'Guam'
    },
    {
      name: 'Coast Guard Base San Juan',
      location: 'Puerto Rico'
    },
    {
      name: 'Coast Guard Base Cape May',
      location: 'New Jersey'
    },
    {
      name: 'Coast Guard Base New Orleans',
      location: 'Louisiana'
    },
    {
      name: 'Coast Guard Base San Pedro',
      location: 'California'
    },
    {
      name: 'Coast Guard Base Galveston',
      location: 'Texas'
    },
    {
      name: 'Coast Guard Base Key West',
      location: 'Florida'
    },
    {
      name: 'Coast Guard Base Miami Beach',
      location: 'Florida'
    },
    {
      name: 'Coast Guard Base St. Petersburg',
      location: 'Florida'
    },
    {
      name: 'Coast Guard Base Mobile',
      location: 'Alabama'
    },
    {
      name: 'Coast Guard Base Charleston',
      location: 'South Carolina'
    },
    {
      name: 'Coast Guard Base Portsmouth',
      location: 'Virginia'
    },
    {
      name: 'Coast Guard Base Seattle',
      location: 'Washington'
    },
    {
      name: 'Coast Guard Base Kodiak',
      location: 'Alaska'
    },
    {
      name: 'Coast Guard Base Honolulu',
      location: 'Hawaii'
    },
    {
      name: 'Coast Guard Base Guam',
      location: 'Guam'
    },
    {
      name: 'Coast Guard Base San Juan',
      location: 'Puerto Rico'
    }
  ];

  // Remove duplicates and create bases
  const uniqueBases = bases.filter((base, index, self) => 
    index === self.findIndex(b => b.name === base.name && b.location === base.location)
  );

  for (const base of uniqueBases) {
    try {
      // First check if base exists
      const existingBase = await prisma.base.findFirst({
        where: {
          name: base.name,
          location: base.location
        }
      });

      if (!existingBase) {
        await prisma.base.create({
          data: base
        });
        console.log(`✅ Created base: ${base.name}, ${base.location}`);
      } else {
        console.log(`ℹ️ Base already exists: ${base.name}, ${base.location}`);
      }
    } catch (error) {
      console.error(`❌ Error creating base ${base.name}:`, error);
    }
  }

  console.log(`🎉 Database seeded with ${uniqueBases.length} military bases!`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

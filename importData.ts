import { db } from './firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';

/**
 * Import sample data to Firebase Firestore
 * Run this once to populate your database with initial data
 */
async function importFirestoreData() {
    try {
        console.log('🚀 Starting data import...');

        // 1. Import Demo Videos
        console.log('📹 Importing demo videos...');
        const demoVideos = [
            {
                id: 1,
                created_at: new Date().toISOString(),
                title: 'Dusk Beauty',
                category: 'ugc ad in hindi',
                thumbnail_url: '',
                video_url: 'https://res.cloudinary.com/dnltq0vcx/video/upload/v1771049938/Dusk_Beauty_ugc_ad_hindi_1_oiksm3.mp4',
                order_index: 1
            },
            {
                id: 2,
                created_at: new Date().toISOString(),
                title: 'AI UGC Ad - Skincare Brand',
                category: 'UGC',
                thumbnail_url: '',
                video_url: 'https://res.cloudinary.com/dnltq0vcx/video/upload/v1771049855/ugcshortsmediademo_ijypaa.mp4',
                order_index: 2
            },
            {
                id: 3,
                created_at: new Date().toISOString(),
                title: 'Product Demo - Fashion',
                category: 'Product',
                thumbnail_url: '',
                video_url: 'https://res.cloudinary.com/dnltq0vcx/video/upload/YOUR_VIDEO_3.mp4',
                order_index: 3
            },
            {
                id: 4,
                created_at: new Date().toISOString(),
                title: 'CGI Animation - Tech Product',
                category: 'CGI',
                thumbnail_url: '',
                video_url: 'https://res.cloudinary.com/dnltq0vcx/video/upload/YOUR_VIDEO_4.mp4',
                order_index: 4
            }
        ];

        for (let i = 0; i < demoVideos.length; i++) {
            const docId = `20260214_165500_00${i + 1}`;
            await setDoc(doc(db, 'ugc_demo_videos', docId), demoVideos[i]);
            console.log(`  ✅ Added demo video: ${demoVideos[i].title}`);
        }

        // 2. Import Hero Settings
        console.log('🎬 Importing hero settings...');
        await setDoc(doc(db, 'ugc_hero_settings', 'active'), {
            id: 1,
            created_at: new Date().toISOString(),
            video_url: 'https://res.cloudinary.com/dnltq0vcx/video/upload/v1771049855/ugcshortsmediademo_ijypaa.mp4',
            poster_url: '',
            is_active: true
        });
        console.log('  ✅ Hero settings configured');

        // 3. Import Brands
        console.log('🏢 Importing brands...');
        const brands = [
            { id: 1, name: 'https://logo.clearbit.com/nike.com' },
            { id: 2, name: 'https://logo.clearbit.com/adidas.com' },
            { id: 3, name: 'https://logo.clearbit.com/apple.com' },
            { id: 4, name: 'https://logo.clearbit.com/samsung.com' },
            { id: 5, name: 'https://logo.clearbit.com/amazon.com' },
            { id: 6, name: 'https://logo.clearbit.com/google.com' },
            { id: 7, name: 'https://logo.clearbit.com/microsoft.com' },
            { id: 8, name: 'https://logo.clearbit.com/netflix.com' }
        ];

        for (let i = 0; i < brands.length; i++) {
            const docId = `20260214_165500_20${i + 1}`;
            await setDoc(doc(db, 'ugc_brands', docId), brands[i]);
            console.log(`  ✅ Added brand ${i + 1}`);
        }

        // 4. Import Testimonials
        console.log('💬 Importing testimonials...');
        const testimonials = [
            {
                id: 1,
                name: 'Sarah Johnson',
                brand: 'FitGear Co',
                quote: 'UGC Shorts Media helped us 3x our ROAS in just 2 months. The AI-generated creatives are game-changing!',
                rating: 5,
                created_at: new Date().toISOString()
            },
            {
                id: 2,
                name: 'Michael Chen',
                brand: 'TechStyle Apparel',
                quote: 'Best decision we made for our ad creative. Conversion rates increased by 180% within the first month.',
                rating: 5,
                created_at: new Date().toISOString()
            },
            {
                id: 3,
                name: 'Emily Rodriguez',
                brand: 'GlowSkin Beauty',
                quote: 'The quality of UGC content is unmatched. Our CPAs dropped by 40% while maintaining high quality leads.',
                rating: 5,
                created_at: new Date().toISOString()
            },
            {
                id: 4,
                name: 'David Park',
                brand: 'UrbanFit Athletics',
                quote: 'Working with UGC Shorts was seamless. They understood our brand and delivered creatives that actually convert.',
                rating: 5,
                created_at: new Date().toISOString()
            }
        ];

        for (let i = 0; i < testimonials.length; i++) {
            const docId = `20260214_165500_30${i + 1}`;
            await setDoc(doc(db, 'ugc_testimonials', docId), testimonials[i]);
            console.log(`  ✅ Added testimonial from ${testimonials[i].name}`);
        }

        console.log('\n✅ ✅ ✅ All data imported successfully! ✅ ✅ ✅\n');
        console.log('📊 Summary:');
        console.log(`  - ${demoVideos.length} demo videos`);
        console.log(`  - 1 hero setting`);
        console.log(`  - ${brands.length} brands`);
        console.log(`  - ${testimonials.length} testimonials`);
        console.log('\n🎉 Your Firebase database is ready!');

    } catch (error) {
        console.error('❌ Error importing data:', error);
    }
}

// Uncomment the line below and run this file to import data
// importFirestoreData();

export { importFirestoreData };

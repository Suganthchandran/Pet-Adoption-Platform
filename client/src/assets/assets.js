import login_image from './Login_Image.png';
import SignUp_Image from './SignUp_Image.png'
import Home_image from './Home_image.jpg'
import Home_dog from './Home_dog.png';
import Home_cat from './Home_cat.png'
import Home_animals from './Home_animals.png'
import Dog_image from './Dog_Image.jpg'
import Cat_image from './Cat_Image.jpg'
import Animal_Banner_image from './Animals_Banner_Image.jpg'
import Dog from './Dog2.jpg'
import Cat from './Cat.webp'
import Rabbit from './Rabbit.jpeg'
import Hamster from './Hamster.jpg'
import Horse from './Horse.jpeg'
import bin_icon from './bin_icon.png'
import stripe from './stripe_logo.png'
import razorpay from './razorpay_logo.png'
import no_Dog from './no_dogs.jpg'
import no_Cat from './no_cats.jpg'
import no_Animal from './no_animals.jpg'
import add_icon from './add_icon.png'
import upload_area from './upload_area.png'
import shop from './shop.jpg'
import contact from './contact.webp'
import noCertificate from './no-certi.webp'
import pdf from './pdf2.png'

export const assets = {
    login_image,
    SignUp_Image,
    Home_image,
    Home_dog,
    Home_cat,
    Home_animals,
    Dog_image,
    Cat_image,
    Animal_Banner_image,
    Dog,
    Cat,
    Rabbit,
    Hamster,
    Horse,
    bin_icon,
    stripe,
    razorpay,
    no_Dog,
    no_Cat,
    no_Animal,
    add_icon,
    upload_area,
    shop,
    contact,
    noCertificate,
    pdf,
    features: [
        {
            image : Home_dog,
            title: 'Check List for New Adopters',
            desc: 'Make the adoption transition as smooth as possible.'
        },
        {
            image: Home_cat,
            title: 'How Old Is A Dog In Human Years?',
            desc: 'Learn how to calculate a dog\'s age in human years.'
        },
        {
            image: Home_animals,        
            title: 'Pet Adoption FAQ’s',
            desc: 'Get answers to all your questions about pet adoption.'
        }
    ]
}

export const animals = [
    {
        id: 1,
        image: Dog,
        name: 'Buddy',
        desc: 'A playful and energetic puppy.',
        bannerImages: [Home_dog,Home_dog,Home_dog,Home_dog],
        type: 'dog',
        breed: 'Golden Retriever',
        age: 'puppy',
        gender: 'male',
        year: '2024',
        color: 'golden'
    },
    {
        id: 2,
        image: Dog,
        name: 'Bella',
        desc: 'Loves to cuddle and is great with kids.',
        bannerImages: ['./dog5.png', './dog6.png', './dog7.png', './dog8.png'],
        type: 'dog',
        breed: 'Labrador Retriever',
        age: 'young',
        gender: 'female',
        year: '2024',
        color: 'black'
    },
    {
        id: 3,
        image: Dog,
        name: 'Charlie',
        desc: 'Loyal and protective.',
        bannerImages: ['./dog9.png', './dog10.png', './dog11.png', './dog12.png'],
        type: 'dog',
        breed: 'German Shepherd',
        age: 'adult',
        gender: 'male',
        year: '2024',
        color: 'brown and black'
    },
    {
        id: 4,
        image: Dog,
        name: 'Lucy',
        desc: 'Calm and gentle.',
        bannerImages: ['./dog13.png', './dog14.png', './dog15.png', './dog16.png'],
        type: 'dog',
        breed: 'Beagle',
        age: 'young',
        gender: 'female',
        year: '2024',
        color: 'tricolor'
    },
    {
        id: 5,
        image: Dog,
        name: 'Max',
        desc: 'A great companion for hikes.',
        bannerImages: ['./dog17.png', './dog18.png', './dog19.png', './dog20.png'],
        type: 'dog',
        breed: 'Border Collie',
        age: 'adult',
        gender: 'male',
        year: '2024',
        color: 'black and white'
    },
    {
        id: 6,
        image: Dog,
        name: 'Daisy',
        desc: 'Full of energy and loves to run.',
        bannerImages: ['./dog21.png', './dog22.png', './dog23.png', './dog24.png'],
        type: 'dog',
        breed: 'Dalmatian',
        age: 'puppy',
        gender: 'female',
        year: '2024',
        color: 'white with black spots'
    },
    {
        id: 7,
        image: Dog,
        name: 'Rocky',
        desc: 'Brave and courageous.',
        bannerImages: ['./dog25.png', './dog26.png', './dog27.png', './dog28.png'],
        type: 'dog',
        breed: 'Rottweiler',
        age: 'adult',
        gender: 'male',
        year: '2024',
        color: 'black and tan'
    },
    {
        id: 8,
        image: Dog,
        name: 'Molly',
        desc: 'Sweet and friendly.',
        bannerImages: ['./dog29.png', './dog30.png', './dog31.png', './dog32.png'],
        type: 'dog',
        breed: 'Poodle',
        age: 'young',
        gender: 'female',
        year: '2024',
        color: 'white'
    },
    {
        id: 9,
        image: Dog,
        name: 'Cooper',
        desc: 'Always ready for an adventure.',
        bannerImages: ['./dog33.png', './dog34.png', './dog35.png', './dog36.png'],
        type: 'dog',
        breed: 'Husky',
        age: 'young',
        gender: 'male',
        year: '2024',
        color: 'gray and white'
    },
    {
        id: 10,
        image: Dog,
        name: 'Sadie',
        desc: 'Loves belly rubs and treats.',
        bannerImages: ['./dog37.png', './dog38.png', './dog39.png', './dog40.png'],
        type: 'dog',
        breed: 'Bulldog',
        age: 'adult',
        gender: 'female',
        year: '2024',
        color: 'brindle'
    },
    {
        id: 11,
        image : Cat,
        name: 'Whiskers',
        desc: 'Loves to nap in the sun.',
        bannerImages: ['./cat1.png', './cat2.png', './cat3.png', './cat4.png'],
        type: 'cat',
        breed: 'Persian',
        age: 'adult',
        gender: 'male',
        year: '2024',
        color: 'white'
    },
    {
        id: 12,
        image: Cat,
        name: 'Luna',
        desc: 'A curious kitten that loves to explore.',
        bannerImages: ['./cat5.png', './cat6.png', './cat7.png', './cat8.png'],
        type: 'cat',
        breed: 'Siamese',
        age: 'puppy',
        gender: 'female',
        year: '2023',
        color: 'cream and brown'
    },
    {
        id: 13,
        image: Cat,
        name: 'Shadow',
        desc: 'Quiet and affectionate.',
        bannerImages: ['./cat9.png', './cat10.png', './cat11.png', './cat12.png'],
        type: 'cat',
        breed: 'Maine Coon',
        age: 'adult',
        gender: 'male',
        year: '2023',
        color: 'gray'
    },
    {
        id: 14,
        image: Cat,
        name: 'Mittens',
        desc: 'Loves to play with toys.',
        bannerImages: ['./cat13.png', './cat14.png', './cat15.png', './cat16.png'],
        type: 'cat',
        breed: 'British Shorthair',
        age: 'young',
        gender: 'female',
        year: '2023',
        color: 'blue-gray'
    },
    {
        id: 15,
        image: Cat,
        name: 'Oliver',
        desc: 'Always looking for a lap to sit on.',
        bannerImages: ['./cat17.png', './cat18.png', './cat19.png', './cat20.png'],
        type: 'cat',
        breed: 'Russian Blue',
        age: 'young',
        gender: 'male',
        year: '2023',
        color: 'blue-gray'
    },
    {
        id: 16,
        image: Cat,
        name: 'Nala',
        desc: 'Adventurous and bold.',
        bannerImages: ['./cat21.png', './cat22.png', './cat23.png', './cat24.png'],
        type: 'cat',
        breed: 'Bengal',
        age: 'young',
        gender: 'female',
        year: '2023',
        color: 'spotted'
    },
    {
        id: 17,
        image: Cat,
        name: 'Simba',
        desc: 'A playful kitten with lots of energy.',
        bannerImages: ['./cat25.png', './cat26.png', './cat27.png', './cat28.png'],
        type: 'cat',
        breed: 'Abyssinian',
        age: 'puppy',
        gender: 'male',
        year: '2023',
        color: 'ruddy'
    },
    {
        id: 18,
        image: Cat,
        name: 'Cleo',
        desc: 'Enjoys lounging on the windowsill.',
        bannerImages: ['./cat29.png', './cat30.png', './cat31.png', './cat32.png'],
        type: 'cat',
        breed: 'Sphynx',
        age: 'adult',
        gender: 'female',
        year: '2023',
        color: 'pink'
    },
    {
        id: 19,
        image: Cat,
        name: 'Tiger',
        desc: 'Likes to chase laser pointers.',
        bannerImages: ['./cat33.png', './cat34.png', './cat35.png', './cat36.png'],
        type: 'cat',
        breed: 'Tabby',
        age: 'young',
        gender: 'male',
        year: '2023',
        color: 'orange'
    },
    {
        id: 20,
        image: Cat,
        name: 'Chloe',
        desc: 'Loves attention and purring loudly.',
        bannerImages: ['./cat37.png', './cat38.png', './cat39.png', './cat40.png'],
        type: 'cat',
        breed: 'Calico',
        age: 'adult',
        gender: 'female',
        year: '2023',
        color: 'calico'
    },
    {
        id: 21,
        image: Rabbit,
        name: 'Buddy',
        desc: 'A playful and energetic puppy.',
        bannerImages: [Home_dog,Home_dog,Home_dog,Home_dog],
        type: 'rabbit',
        breed: 'Golden Retriever',
        age: 'puppy',
        gender: 'male',
        year: '2024',
        color: 'golden'
    },
    {
        id: 22,
        image: Rabbit,
        name: 'Bella',
        desc: 'Loves to cuddle and is great with kids.',
        bannerImages: ['./dog5.png', './dog6.png', './dog7.png', './dog8.png'],
        type: 'rabbit',
        breed: 'Labrador Retriever',
        age: 'young',
        gender: 'female',
        year: '2024',
        color: 'black'
    },
    {
        id: 23,
        image: Rabbit,
        name: 'Charlie',
        desc: 'Loyal and protective.',
        bannerImages: ['./dog9.png', './dog10.png', './dog11.png', './dog12.png'],
        type: 'rabbit',
        breed: 'German Shepherd',
        age: 'adult',
        gender: 'male',
        year: '2024',
        color: 'brown and black'
    },
    {
        id: 24,
        image: Hamster,
        name: 'Lucy',
        desc: 'Calm and gentle.',
        bannerImages: ['./dog13.png', './dog14.png', './dog15.png', './dog16.png'],
        type: 'hamster',
        breed: 'Beagle',
        age: 'young',
        gender: 'female',
        year: '2024',
        color: 'tricolor'
    },
    {
        id: 25,
        image: Hamster,
        name: 'Max',
        desc: 'A great companion for hikes.',
        bannerImages: ['./dog17.png', './dog18.png', './dog19.png', './dog20.png'],
        type: 'hamster',
        breed: 'Border Collie',
        age: 'adult',
        gender: 'male',
        year: '2024',
        color: 'black and white'
    },
    {
        id: 26,
        image: Hamster,
        name: 'Daisy',
        desc: 'Full of energy and loves to run.',
        bannerImages: ['./dog21.png', './dog22.png', './dog23.png', './dog24.png'],
        type: 'hamster',
        breed: 'Dalmatian',
        age: 'puppy',
        gender: 'female',
        year: '2024',
        color: 'white with black spots'
    },
    {
        id: 27,
        image: Horse,
        name: 'Rocky',
        desc: 'Brave and courageous.',
        bannerImages: ['./dog25.png', './dog26.png', './dog27.png', './dog28.png'],
        type: 'horse',
        breed: 'Rottweiler',
        age: 'adult',
        gender: 'male',
        year: '2024',
        color: 'black and tan'
    },
    {
        id: 28,
        image: Horse,
        name: 'Molly',
        desc: 'Sweet and friendly.',
        bannerImages: ['./dog29.png', './dog30.png', './dog31.png', './dog32.png'],
        type: 'horse',
        breed: 'Poodle',
        age: 'young',
        gender: 'female',
        year: '2024',
        color: 'white'
    },
    {
        id: 29,
        image: Horse,
        name: 'Cooper',
        desc: 'Always ready for an adventure.',
        bannerImages: ['./dog33.png', './dog34.png', './dog35.png', './dog36.png'],
        type: 'horse',
        breed: 'Husky',
        age: 'young',
        gender: 'male',
        year: '2024',
        color: 'gray and white'
    },
    // {
    //     id: 30,
    //     image: Horse,
    //     name: 'Sadie',
    //     desc: 'Loves belly rubs and treats.',
    //     bannerImages: ['./dog37.png', './dog38.png', './dog39.png', './dog40.png'],
    //     type: 'horse',
    //     breed: 'Bulldog',
    //     age: 'adult',
    //     gender: 'female',
    //     year: '2024',
    //     color: 'brindle'
    // },
];




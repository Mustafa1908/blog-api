// seed.js

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const saltRounds = 10;

async function main() {
  const hashedPassword1 = await bcrypt.hash("lolo", saltRounds);
  const commentDate = "Saturday, 28 December 2024";

  const user1 = await prisma.user.create({
    data: {
      username: "Louis Soyer",
      email: "louis@soyer.com",
      password: hashedPassword1,
      role: "author",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "Dominique Pomeroy",
      email: "dominique@pomeroy.com",
      password: hashedPassword1,
      role: "author",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      username: "Alban Larousse",
      email: "alban@larousse.com",
      password: hashedPassword1,
      role: "author",
    },
  });

  const user4 = await prisma.user.create({
    data: {
      username: "Alex Gouin",
      email: "alex@gouin.com",
      password: hashedPassword1,
      role: "author",
    },
  });

  const user5 = await prisma.user.create({
    data: {
      username: "Nicolas Larousse",
      email: "nicolas@larousse.com",
      password: hashedPassword1,
      role: "author",
    },
  });

  const user6 = await prisma.user.create({
    data: {
      username: "Boniface Robiquet",
      email: "boniface@robiquet.com",
      password: hashedPassword1,
      role: "author",
    },
  });

  const user7 = await prisma.user.create({
    data: {
      username: "Zacharie Breguet",
      email: "zacharia@breguet.com",
      password: hashedPassword1,
      role: "author",
    },
  });

  const user8 = await prisma.user.create({
    data: {
      username: "Julien Bouthillier",
      email: "julien@bouthillier.com",
      password: hashedPassword1,
      role: "author",
    },
  });

  const user9 = await prisma.user.create({
    data: {
      username: "Rémi Baillairgé",
      email: "remi@baillairgé.com",
      password: hashedPassword1,
      role: "author",
    },
  });

  const user10 = await prisma.user.create({
    data: {
      username: "Abraham Féret",
      email: "abraham@féret.com",
      password: hashedPassword1,
      role: "author",
    },
  });

  //first post

  const post1 = await prisma.post.create({
    data: {
      postTitle: "Articles without images",
      postText:
        "Nowadays, people seem generally unable to accept an article without any pictures in it, especially if this is a long article. But, why?Our life has become lots of bits of fragments. Believe it or not, most of us never concentrate on one thing for longer than several minutes. There are so many distractions. Every time you want to focus, there comes either an e-mail, a message from iMessage/Whatsapp/Messenger/..., or a notification from one of the installed apps on your cell phone. The only solution appears to be getting rid of the Internet. As long as you are online, you cannot be unaffected.However, things may not work as smoothly as you expect, even if you have cut off the wire/wireless. We have been permanently changed, actually trained, by the fragmental lifestyle which has become a new mainstream. The preference of illustrations in articles is an obvious clue. Our concentration needs images, just like a person climbing a mountain always needs a rest.We are gradually losing the capability of continuous reading. We become afraid of long sentences or paragraphs. This is an attention-worthy phenomenon. In my view, images can never replace our languages. Besides being distractive, they can even be misleading. I do admit that providential use of pictures makes an essay more interesting, however, in most cases, illustrations are being abused -- authors insert an image just because they want to catch readers' eyes.From an author's perspective, I am always resisting the impulsion to use pictures, unless I am 100 percent sure of the positive effect the image will bring about. And from a reader's perspective, while also being shaped by the era, I am struggling not to lose my reading ability. At least not that fast.",
      published: true,
      createdAt: commentDate,
      authorId: user1.id,
    },
  });

  await prisma.comment.create({
    data: {
      comment:
        "I see both sides of the argument here. Yes, we've become conditioned to expect images, but I don't think that means we should abandon long-form reading altogether. It's more about striking a balance. Some articles definitely benefit from images, like when they help explain a concept or provide context, but others can stand perfectly fine on their own. The real challenge is staying disciplined and focused enough to read deeply, even when we're bombarded with distractions. It's a skill that's worth preserving, in my opinion.",
      createdAt: commentDate,
      postId: post1.id,
      userId: user2.id,
    },
  });

  await prisma.comment.create({
    data: {
      comment:
        "I totally agree with this! It's crazy how dependent we are on images these days. I find myself getting bored halfway through an article if there's no picture to break things up. But at the same time, I do get frustrated when the pictures don't really add anything to the article. It's like they're there just for the sake of it, and it actually distracts me from the point.",
      createdAt: commentDate,
      postId: post1.id,
      userId: user3.id,
    },
  });

  await prisma.comment.create({
    data: {
      comment:
        "I think we're all just getting used to faster information consumption. Everything is bite-sized now - memes, TikToks, tweets - even articles are being shortened to fit that attention span. It's not necessarily a bad thing, but we have to acknowledge that our brains are rewiring themselves because of all this tech. And yeah, images definitely make a difference in holding attention. I don't mind it, but it's a shame when articles just throw in random pictures for no reason.!",
      createdAt: commentDate,
      postId: post1.id,
      userId: user4.id,
    },
  });

  await prisma.comment.create({
    data: {
      comment:
        "I don't agree with this at all. I still love reading long, detailed articles without any interruptions. I think people have just gotten lazy and prefer to skim over things, looking for pictures instead of actual content. The issue isn't the lack of images; it's the lack of effort to actually engage with the material. I miss when people could sit down and read without getting distracted every five seconds.",
      createdAt: commentDate,
      postId: post1.id,
      userId: user5.id,
    },
  });

  await prisma.comment.create({
    data: {
      comment:
        "I think this article hits the nail on the head. The constant influx of notifications and images is definitely ruining our ability to focus. It's no wonder that people can't finish long articles anymore. It's not even just articles, though - it's books, too. I've had to consciously put my phone away just to finish a chapter without getting distracted. It's tough, but we can't let technology control us like this.",
      createdAt: commentDate,
      postId: post1.id,
      userId: user6.id,
    },
  });

  await prisma.comment.create({
    data: {
      comment:
        "While I get that images can be distracting, I do think they serve a purpose in some cases. A well-placed image can really enhance understanding, especially in technical articles or to illustrate complex ideas. The problem is more about overusing them or using irrelevant pictures that add no value. Authors should be mindful of how they use visuals, not just throw them in for decoration.",
      createdAt: commentDate,
      postId: post1.id,
      userId: user7.id,
    },
  });

  //second post

  const post2 = await prisma.post.create({
    data: {
      postTitle: "Quantum Computing",
      postText:
        "Quantum computing is a field of study focused on the development of computers that utilize the principles of quantum mechanics. Unlike classical computers that use bits as the smallest unit of data, quantum computers use qubits, which can represent and store information in multiple states simultaneously. This capability allows quantum computers to perform complex calculations at unprecedented speeds, making them ideal for tasks such as cryptography, optimization, and simulation of quantum systems.",
      published: true,
      createdAt: commentDate,
      authorId: user2.id,
    },
  });

  await prisma.comment.create({
    data: {
      comment:
        "Quantum computing sounds like the future! I can't believe how much faster these machines could be compared to traditional computers. Definitely exciting for tasks like cryptography and optimization!",
      createdAt: commentDate,
      postId: post2.id,
      userId: user3.id,
    },
  });

  await prisma.comment.create({
    data: {
      comment:
        "I've read about quantum mechanics, but using qubits instead of bits is a game changer. Can't wait to see how this affects technology in the coming years",
      createdAt: commentDate,
      postId: post2.id,
      userId: user1.id,
    },
  });

  await prisma.comment.create({
    data: {
      comment:
        "So cool how quantum computers can store information in multiple states at once. It really opens up new possibilities for tackling problems we couldn't solve before!",
      createdAt: commentDate,
      postId: post2.id,
      userId: user5.id,
    },
  });

  await prisma.comment.create({
    data: {
      comment:
        "It's amazing how quantum computing could impact industries like cybersecurity. The speed and complexity are mind-blowing compared to what we have today.",
      createdAt: commentDate,
      postId: post2.id,
      userId: user6.id,
    },
  });

  await prisma.comment.create({
    data: {
      comment:
        "I'm curious about how exactly quantum computers simulate quantum systems. Is that different from how traditional computers handle simulations?",
      createdAt: commentDate,
      postId: post2.id,
      userId: user8.id,
    },
  });

  //third post

  const post3 = await prisma.post.create({
    data: {
      postTitle: "Blockchain Technology",
      postText:
        "Blockchain technology is a decentralized digital ledger system that records transactions across many computers in such a way that the registered transactions cannot be altered retroactively. This technology underpins cryptocurrencies like Bitcoin and has applications in various fields including finance, supply chain management, and healthcare. Its decentralized nature enhances security and transparency, making it a promising solution for numerous digital applications.",
      published: true,
      createdAt: commentDate,
      authorId: user3.id,
    },
  });

  await prisma.comment.create({
    data: {
      comment:
        "Blockchain technology seems like a real breakthrough! The fact that transactions can't be altered retroactively is such a strong feature for security.",
      createdAt: commentDate,
      postId: post3.id,
      userId: user4.id,
    },
  });

  await prisma.comment.create({
    data: {
      comment:
        "I'm amazed at how blockchain can be applied in so many industries. Beyond cryptocurrencies, it could totally transform fields like supply chain and healthcare",
      createdAt: commentDate,
      postId: post3.id,
      userId: user10.id,
    },
  });

  await prisma.comment.create({
    data: {
      comment:
        "The decentralized nature of blockchain gives it an edge over traditional systems. It's like having multiple checks and balances in one place!",
      createdAt: commentDate,
      postId: post3.id,
      userId: user1.id,
    },
  });

  await prisma.comment.create({
    data: {
      comment:
        "Can't believe how blockchain is changing the way we think about transparency and security. It really has the potential to disrupt a lot of industries",
      createdAt: commentDate,
      postId: post3.id,
      userId: user6.id,
    },
  });

  //fourth post

  const post4 = await prisma.post.create({
    data: {
      postTitle: "Artificial Intelligence (AI)",
      postText:
        "Artificial Intelligence (AI) is the simulation of human intelligence in machines programmed to think and learn. AI encompasses various subfields, including machine learning, natural language processing, and robotics. Applications of AI are vast, ranging from virtual assistants and recommendation systems to autonomous vehicles and advanced data analysis, reshaping industries and enhancing decision-making processes.",
      published: true,
      createdAt: commentDate,
      authorId: user6.id,
    },
  });

  await prisma.comment.create({
    data: {
      comment:
        "AI is truly revolutionizing so many industries! It's amazing how machines can now think, learn, and even make decisions like humans",
      createdAt: commentDate,
      postId: post4.id,
      userId: user3.id,
    },
  });

  await prisma.comment.create({
    data: {
      comment:
        "The potential of AI seems limitless! From virtual assistants to autonomous vehicles, it's exciting to see how it's changing the way we live and work.",
      createdAt: commentDate,
      postId: post4.id,
      userId: user1.id,
    },
  });

  await prisma.comment.create({
    data: {
      comment:
        "I'm fascinated by how AI can improve decision-making processes. The ability to analyze huge amounts of data quickly is a game changer.",
      createdAt: commentDate,
      postId: post4.id,
      userId: user5.id,
    },
  });

  //fifth post

  const post5 = await prisma.post.create({
    data: {
      postTitle: "Augmented Reality (AR)",
      postText:
        "Augmented Reality (AR) is an interactive experience that overlays digital information in the real world, enhancing a user's perception of their environment. AR technology can be found in applications such as gaming, education, and training simulations. By combining real-world and digital elements, AR provides innovative ways to engage users and improve learning experiences.These articles provide an overview of significant technological concepts and innovations shaping the future.",
      published: true,
      createdAt: commentDate,
      authorId: user8.id,
    },
  });

  await prisma.comment.create({
    data: {
      comment:
        "Augmented Reality is such a cool technology! The idea of blending digital elements with the real world can totally change how we experience things like gaming and education",
      createdAt: commentDate,
      postId: post5.id,
      userId: user9.id,
    },
  });

  await prisma.comment.create({
    data: {
      comment:
        "I'm really excited about the possibilities of AR in training simulations. It's amazing how it can provide real-world experiences without the risks.",
      createdAt: commentDate,
      postId: post5.id,
      userId: user1.id,
    },
  });

  //sixth post

  const post6 = await prisma.post.create({
    data: {
      postTitle: "Internet of Things (IoT)",
      postText:
        "The Internet of Things (IoT) refers to the interconnection of everyday devices to the Internet, allowing them to send and receive data. This network of devices includes everything from smart home appliances to industrial machinery. IoT has the potential to improve efficiency, reduce costs, and enhance user experience across various sectors, including healthcare, agriculture, and urban development.",
      published: true,
      createdAt: commentDate,
      authorId: user10.id,
    },
  });

  await prisma.comment.create({
    data: {
      comment:
        "The Internet of Things is transforming how we interact with everyday objects. It's incredible that even appliances and machinery can now communicate with each other!",
      createdAt: commentDate,
      postId: post6.id,
      userId: user1.id,
    },
  });

  await prisma.comment.create({
    data: {
      comment:
        "I can see how IoT will make life more convenient and efficient, especially with smart home devices. It's exciting to think about the possibilities in sectors like healthcare and agriculture",
      createdAt: commentDate,
      postId: post6.id,
      userId: user8.id,
    },
  });

  await prisma.comment.create({
    data: {
      comment:
        "It's fascinating how IoT can improve user experiences, whether it's through smart homes or healthcare innovations. It's like technology is becoming more intuitive.",
      createdAt: commentDate,
      postId: post6.id,
      userId: user5.id,
    },
  });

  console.log("Database has been populated with sample data!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

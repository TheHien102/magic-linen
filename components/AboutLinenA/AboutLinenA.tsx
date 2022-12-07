import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import HeaderTitle from '../Global/HeaderTitle/HeaderTitle';
import Image from 'next/image';
import about1 from '../../assets/images/about1.jpg';
import about2 from '../../assets/images/about2.jpg';

type Props = {};

const AboutLinenA = (props: Props) => {
  return (
    <Box sx={{ mb: 5 }}>
      <HeaderTitle title='About Linen A' />
      <Typography
        sx={{
          fontFamily: 'Josefin Sans',
          fontSize: '22px',
          color: '#4c4c4c',
          fontWeight: '300',
          textAlign: 'center',
          lineHeight: 1.63,
          letterSpacing: '0.5px',
          mb: 3,
        }}
      >
        At MagicLinen we believe that home linen should be both functional and
        beautiful. With our rich color palette and unique design details, we
        invite you to celebrate effortless style, surround yourself with beauty
        and fall in love with linen.
      </Typography>
      <iframe
        width='1175'
        height='493'
        src='https://www.youtube.com/embed/LUzwu8xm388?list=TLGGAmaTPWeyusAwNzEyMjAyMg'
        title='MagicLinen - Our Story'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      ></iframe>
      <HeaderTitle title='Note from the founder' fontSize='32px' />
      <Box sx={{ display: 'flex', gap: '15px' }}>
        <Typography
          sx={{
            fontFamily: 'Josefin Sans',
            fontSize: '16px',
            color: '#4c4c4c',
            fontWeight: '300',
            textAlign: 'justify',
            lineHeight: 1.63,
            letterSpacing: '0.5px',
            width: '50%',
            height: 'fit-content',
            marginY: 'auto',
          }}
        >
          Since childhood linen meant special occasions. I can still remember my
          gran fussing over table linen just before big family gatherings. There
          was always a magical feeling that something special was about to
          happen. When it came to redecorating my own home I wanted to
          reintroduce that feeling back into my household. I kept coming across
          brands that offer linen basics with few color choices and nothing
          seemed to fit my family’s modern lifestyle. After a long search, I sat
          down and came up with a few designs of my own. MagicLinen was born on
          my kitchen table and what started as a few bedding sets made
          exclusively for my friends and family has now flourished into a wide
          range of kitchen, bath, table, bedding, and clothing linen
          collections. I’m proud that today I have a whole team of experts
          behind me, working with passion to create products that help celebrate
          the effortless beauty of linen.
        </Typography>
        {/* If have 3 images us this code bellow */}
        {/* <Box
          sx={{
            display: 'grid',
            gridAutoFlow: 'row',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: 1,
            width: '50%',
          }}
        >
          <Box
            sx={{ gridColumn: '1', gridRow: '1 / 4', backgroundColor: 'white' }}
          >
            1
          </Box>
          <Box sx={{ backgroundColor: 'white', gridRow: '2 / 4' }}>2</Box>
          <Box sx={{ backgroundColor: 'white' }}>3</Box>
        </Box> */}
        <Box sx={{ width: '50%', position: 'relative' }}>
          <Image src={about1} alt='about1' />
        </Box>
      </Box>
      <HeaderTitle title='Our Team' fontSize='32px' />
      <Box sx={{ display: 'flex', gap: '15px' }}>
        <Box sx={{ width: '50%', position: 'relative' }}>
          <Image src={about2} alt='about2' />
        </Box>
        <Typography
          sx={{
            fontFamily: 'Josefin Sans',
            fontSize: '16px',
            color: '#4c4c4c',
            fontWeight: '300',
            textAlign: 'justify',
            lineHeight: 1.63,
            letterSpacing: '0.5px',
            width: '50%',
            height: 'fit-content',
            marginY: 'auto',
          }}
        >
          What started as a one-person team has now evolved into a company
          employing over 20 professionals. From the production team to your
          beloved customer support specialists, each member is an expert in
          their field and contributes to the final product that you use at home.{' '}
          <br></br>
          <br></br>
          MagicLinen has an in-house production facility where we hand-make
          every product with love, care, and a bit of magic. Not only does
          having a production facility help us better understand the production
          processes, but we also create jobs for our local community. Keeping in
          mind that the textile and fashion industry is notorious for bad
          working conditions, we take extra care of our production house workers
          and ensure the best possible work environment.
        </Typography>
      </Box>
      <HeaderTitle title='Our Design Ethos' fontSize='32px' />
      <Typography
        sx={{
          fontFamily: 'Josefin Sans',
          fontSize: '18px',
          color: '#4c4c4c',
          fontWeight: '500',
          lineHeight: 1.63,
          letterSpacing: '0.5px',
          marginY: 2,
        }}
      >
        We are meticulous about details and colors
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Josefin Sans',
          fontSize: '16px',
          color: '#4c4c4c',
          fontWeight: '300',
          textAlign: 'justify',
          lineHeight: 1.63,
          letterSpacing: '0.5px',
        }}
      >
        Each MagicLinen product is carefully designed and handcrafted in
        Vilnius, Lithuania. We believe that it is the little details that matter
        in life so we’ve added magical touches to our products in the form of
        ruffles, pom poms, coconut buttons and more. We also have rich color
        palettes for home textiles and clothing you can choose from.
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Josefin Sans',
          fontSize: '18px',
          color: '#4c4c4c',
          fontWeight: '500',
          lineHeight: 1.63,
          letterSpacing: '0.5px',
          marginY: 2,
        }}
      >
        We care about your vision
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Josefin Sans',
          fontSize: '16px',
          color: '#4c4c4c',
          fontWeight: '300',
          textAlign: 'justify',
          lineHeight: 1.63,
          letterSpacing: '0.5px',
        }}
      >
        We understand that each home is unique and is very personal to every one
        of you. We pride ourselves on flexible customisation so if you have
        something in mind why don’t you get in touch with us and we’ll help to
        bring your vision to life.
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Josefin Sans',
          fontSize: '18px',
          color: '#4c4c4c',
          fontWeight: '500',
          lineHeight: 1.63,
          letterSpacing: '0.5px',
          marginY: 2,
        }}
      >
        We care about the planet and you
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Josefin Sans',
          fontSize: '16px',
          color: '#4c4c4c',
          fontWeight: '300',
          textAlign: 'justify',
          lineHeight: 1.63,
          letterSpacing: '0.5px',
        }}
      >
        Manufacturing of textiles can be a complicated process, involving
        various treatments and chemicals which can be harmful to you and the
        planet. Ensuring that we do no harm to either is at the top of our list,
        this is why we chose to be completely transparent and invested in
        third-party testing. Our linen fabric is Oeko-Tex certified meaning
        it&apos;s absolutely absent from harmful substances and chemicals. We
        are also excited about being able to offer you the option of reducing
        your plastic waste as we have partnered with environmentally friendly
        packaging suppliers. Our mailers are made out of corn starch and PBAT, a
        bio-based polymer, which means they do not leave behind any of the
        damaging residues that plastics do when they break down
      </Typography>
    </Box>
  );
};

export default AboutLinenA;

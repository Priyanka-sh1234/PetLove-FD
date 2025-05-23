import { image } from 'framer-motion/client'
import React from 'react'




const Revision =( )=>{
    return(
        <>
            {/* <div 
            className='relative h-full bg-cover bg-center' 
            style="background-image:url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY4EYBJdnabuSbsKOxUEYLv8pqeYXr5fJntw&s')">
            </div> */}
            <div className='container mx-auto bg-amber-400'>Helllo</div>
            <div class="max-w-md mx-auto mt-10 p-6 rounded-lg text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
  <h2 class="text-2xl font-bold">Welcome!</h2>
  <p class="mt-2">This box uses gradient backgrounds, padding, and shadows.</p>
</div>


<div className='bg-gradient-to-r text-white mx-auto rounded-md mt-10 p-6 from-indigo-500 to-purple-600 max-w-md shadow-lg'>
<h2 className='font-bold text-2xl'>Welcome!</h2>
<div className='mt-2'>This box uses gradient backgrounds, padding, and shadows.</div>
</div>

<div class="flex divide-x divide-gray-400">
  <div class="px-4">One</div>
  <div class="px-4">Two</div>
  <div class="px-4">Three</div>
</div>


{/* add pipe between one two three , one| two|three */}
        
        
       {/* rings  */}

<button class="ring-2 ring-blue-500 ring-offset-2 px-4 py-2 rounded">
  Ringed Button
</button>

<div class="p-6 border-2 border-dashed border-blue-500 rounded-lg max-w-sm mx-auto mt-6">
  <h2 class="text-lg font-bold mb-2">Bordered Box</h2>
  <p class="text-gray-700">This card has a dashed border, padding, and rounded corners.</p>
</div>

<button class="ring-2 ring-blue-500 ring-offset-2 ring-offset-black px-4 py-2 rounded">
  Ring Offset
</button>


<div class="p-4 bg-gray-100 rounded-lg">
  <h2 class="text-xl font-bold text-gray-800">Product Title</h2>
  <p class="text-base font-normal text-gray-600">This is the product description using normal weight.</p>
  <span class="text-sm font-medium text-green-600">In stock</span>
</div>

\
<div class="p-4 space-y-3 bg-gray-100">
  <p class="text-left">Left aligned text (default)</p>
  <p class="text-center">This is center aligned</p>
  <p class="text-right">This is right aligned</p>
  <p class="text-justify">
    Justified text stretches the line so that each one touches both left and right edges, which is often used in books or documents.
  </p>
</div>


<p class="text-center md:text-left lg:text-right">
  This text changes alignment based on screen size.
</p>

<div class="space-y-4 max-w-lg mx-auto">
  <p class="leading-tight bg-yellow-100 p-2">
    This is tight leading. The lines are close together.
  </p>

  <p class="leading-relaxed bg-green-100 p-2">
    This is relaxed leading. There's more vertical space between lines, making it easier to read for longer blocks of text.
  </p>

  <p class="leading-loose bg-blue-100 p-2">
    Loose leading is extra spacious. It’s useful when you want to make something feel airy or elegant.
  </p>
</div>


<div class="space-y-3 p-4">
  <p class="tracking-tighter text-xl font-semibold">TIGHTER LETTERS</p>
  <p class="tracking-normal text-xl font-semibold">NORMAL LETTERS</p>
  <p class="tracking-wider text-xl font-semibold">WIDER LETTERS</p>
  <p class="tracking-widest text-xl font-semibold">WIDEST LETTERS</p>
</div>

<h2 class="uppercase tracking-widest text-sm text-gray-500">New Collection</h2>



<div class="space-y-2 text-lg">
  <p class="underline text-blue-600">This is underlined text</p>
  <p class="line-through text-red-500">This text is struck through</p>
  <p class="overline text-green-600">This text has an overline</p>
  <p class="no-underline text-purple-600">This had underline, now removed</p>
</div>



<div class="w-60 p-4 border rounded">
  <h3 class="text-sm font-bold truncate">
    Super Long Product Name That Won't Fit on One Line
  </h3>
  <p class="text-gray-500 text-xs mt-1">Description goes here</p>
</div>

        </>
    )
}

export default Revision
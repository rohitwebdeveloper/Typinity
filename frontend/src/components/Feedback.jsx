import React from 'react'

const Feedback = ({feedbackText}) => {
    return (
  <div className="max-w-[800px] w-full bg-gray-800 rounded-2xl shadow-lg p-3 sm:p-6 space-y-4 sm:space-y-6 my-9">

    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-cyan-400">AI-Powered Typing Feedback</h2>

    <div id="feedbackBox" className="bg-gray-700 p-2 sm:p-5 w-full rounded-xl shadow-inner h-64 overflow-x-clip overflow-y-auto">
      <p className="text-gray-300" id="feedbackText w-full" >
        👋  {feedbackText} Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, quidem repellat molestias harum architecto aut maiores officiis vero adipisci necessitatibus aperiam, odit hic reprehenderit ad eaque magnam cum? Eos ipsam unde doloribus nobis voluptates libero, repellat accusantium laborum tenetur, nemo qui in excepturi corporis dolor ab veritatis vero amet animi soluta autem consequuntur a? Excepturi id, voluptates nisi sunt eius officia recusandae voluptas velit ipsa consectetur ipsum vel. Deleniti fuga excepturi at itaque eum doloribus assumenda suscipit et. Alias incidunt numquam quas ratione enim dolor ab molestias voluptas odit, rem iusto! Architecto, modi iste? Qui quam quod dicta omnis consequatur numquam, laudantium vitae, sed dolorem modi consectetur nostrum laborum autem quidem nulla cupiditate inventore nisi veniam delectus rem, cum impedit blanditiis velit? Maxime vel ad praesentium doloribus cupiditate quibusdam necessitatibus commodi rem sapiente itaque cum reprehenderit tenetur sed error quo at consectetur vitae ipsum, unde reiciendis dolores odio! Consectetur obcaecati est corporis! Non ratione ad minus consectetur dolorem expedita, corrupti earum quisquam iste. Vel architecto magnam tempore nulla repellendus quo, non molestiae commodi illum provident reiciendis sunt atque ratione, autem magni beatae vitae? Dolorem libero, tenetur repellendus reprehenderit itaque, blanditiis omnis voluptatem adipisci rerum soluta saepe labore exercitationem, aperiam consequatur.
      </p>
    </div>

  </div>


    )
}

export default Feedback
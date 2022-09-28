
    let id;

    async function movies(){
        let api_key="8148f6f2e49ff4e6c513a45ef4d6c4f7";
        let url=await fetch(`https://api.themoviedb.org/4/discover/movie?sort_by=popularity.desc&api_key=${api_key}`);

        let data =await url.json();
        let movies=data.results
        popular_movies(movies);
        slidingMovies(movies);

    }
    movies();


    async function search_movies(query){
        let api_key="8148f6f2e49ff4e6c513a45ef4d6c4f7";
        let url=await fetch(`https://api.themoviedb.org/4/discover/movie?sort_by=popularity.desc&api_key=${api_key}`);

        let search_url=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`);
        let data_search=await search_url.json();
        let search_all_data=data_search.results;
        return search_all_data;

        let data =await url.json();
        let movies=data.results
        popular_movies(movies);
        slidingMovies(movies);
        slidestarting(movies);
    }



    async function search(){
        document.getElementById('search_results').innerHTML="";
        let query=document.getElementById('search').value;
        let alldata=await search_movies(query);
        alldata.forEach(element => {

        let div=document.createElement('div');     
        let div1=document.createElement('div');    
        let div2=document.createElement('div');

        let movie_Poster=`https://image.tmdb.org/t/p/w500${element.poster_path}`;
        let img=document.createElement('img');
        img.src=movie_Poster;
        img.addEventListener('click',function(){
            gotoDetails(element);
        })

        let p=document.createElement('p');
        p.innerText=element.title;

        div1.append(img);
        div2.append(p);

        div.append(div1,div2);

        document.getElementById('search_results').style.overflow='scroll';
        document.getElementById('search_results').style.backgroundColor=' rgba(11, 12, 26, 0.69)';
        document.getElementById('search_results').append(div);
    });
        
    }

    let id1;
    
    function wait_movie(func,deley){
        if(id1){
            clearTimeout();
        }
      id1=setTimeout(function(){
            func();
        },deley)
    }



    function gotoDetails(element){

        if(id){
            clearInterval(id);
        }
        document.getElementById('search_results').style.overflow='hidden';
        document.getElementById('search_results').style.backgroundColor='transparent';
        document.getElementById('search_results').innerHTML="";
        document.getElementById('search').value="";

        let div1=document.createElement('div');
        let div2=document.createElement('div');

        let h3=document.createElement('h3');
        h3.innerText=element.title;

        let p=document.createElement('p');
        p.innerText=element.overview;

        document.getElementById('sliding_movies').innerHTML="";
        let movie_Poster=`https://image.tmdb.org/t/p/w500${element.poster_path}`;
        let img=document.createElement('img');
        img.src=movie_Poster;

        div1.append(img);
        div2.append(h3,p);

        document.getElementById('sliding_movies').append(div2,div1);
    }



    function popular_movies(movies) {

        movies.forEach(element => {

            let div=document.createElement('div');

            let movie_Poster=`https://image.tmdb.org/t/p/w500${element.poster_path}`;
            let img=document.createElement('img');
            img.src=movie_Poster;

            let h3=document.createElement('h3');
            h3.innerText=element.title;

            div.append(img,h3);

            document.getElementById('movies').append(div);
        });
    };


    function slidestarting(movies){
        let div1=document.createElement('div');
        let div2=document.createElement('div');

        let h3=document.createElement('h3');
        h3.innerText=movies[0].title;

        let p=document.createElement('p');
        p.innerText=movies[0].overview;

        document.getElementById('sliding_movies').innerHTML="";
        let movie_Poster=`https://image.tmdb.org/t/p/w500${movies[0].poster_path}`;
        let img=document.createElement('img');
        img.src=movie_Poster;

        div1.append(img);
        div2.append(h3,p);
  
        document.getElementById('sliding_movies').append(div2,div1);
    }


    let i=1;

    function slidingMovies(movies) {
        slidestarting(movies);
            id =setInterval(() => {

                if(i===movies.length){
                    i=0;
                }

                let div1=document.createElement('div');
                let div2=document.createElement('div');

                let h3=document.createElement('h3');
                h3.innerText=movies[i].title;

                let p=document.createElement('p');
                p.innerText=movies[i].overview;

                document.getElementById('sliding_movies').innerHTML="";
                let movie_Poster=`https://image.tmdb.org/t/p/w500${movies[i].poster_path}`;
                let img=document.createElement('img');
                img.src=movie_Poster;

                div1.append(img);
                div2.append(h3,p);
  
                document.getElementById('sliding_movies').append(div2,div1);

                i++;

            },3000);
            
        }


        document.getElementById('home').addEventListener('click',goToHome);
        function goToHome(){
            window.location.reload();
        }
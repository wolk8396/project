export class RATING {

 static activeRating (idRating){
    const rating = document.createElement('div');
    const rating_container = document.createElement('div');
    const rating_active = document.createElement('div');
    const rating_items = document.createElement('div');
    const rating_value = document.createElement('div');
    const item5 = document.createElement('input');
    const item4 = document.createElement('input');
    const item3 = document.createElement('input');
    const item2 = document.createElement('input');
    const item1 = document.createElement('input');

    item5.type = 'radio';
    item4.type = 'radio';
    item3.type = 'radio';
    item2.type = 'radio';
    item1.type = 'radio';

    item5.id ='rating-5';
    item4.id ='rating-4';
    item3.id ='rating-3';
    item2.id ='rating-2';
    item1.id ='rating-1';

    item5.value = '5';
    item4.value = '4';
    item3.value = '3';
    item2.value = '2';
    item1.value = '1';

    rating.className = 'rating';
    rating_container.className = 'rating__container';
    rating_value.className = 'rating__value';
    rating_active.className = 'rating-active';
    rating_items.className = "wrapper-rating";
    item5.className = "wrapper-rating__item";
    item4.className = "wrapper-rating__item";
    item3.className = "wrapper-rating__item";
    item2.className = "wrapper-rating__item";
    item1.className = "wrapper-rating__item";

    item5.name ='rating';
    item4.name ='rating';
    item3.name ='rating';
    item2.name ='rating';
    item1.name ='rating';

    rating.append(rating_container,  rating_value);

    rating_container.append(rating_active, rating_items);
    rating_items.append(item1, item2, item3, item4, item5);
    
    rating_active.style.width = `${idRating*20}%`
  
    return  rating
  }

}

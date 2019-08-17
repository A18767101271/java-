package chapter_generics.practise_10;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by wislie on 2018/11/8.
 */
public class ListMaker<T> {

    public List<T> create(T data, int size){
        List<T> dataList = new ArrayList<>();
        for(int i = 0; i < size; i++){
            dataList.add(data);
        }
        return dataList;
    }

    public static void main(String[] args) {
        ListMaker<String> maker = new ListMaker<>();
        List<String> stringList = maker.create("wislie", 3);
        System.out.println(stringList);
        //[wislie, wislie, wislie]
    }
}

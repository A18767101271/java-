package chapter_generics.practise_4;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * 随机获取数据
 * Created by wislie on 2018/6/19.
 */
public class RandomList<T> {

    private final Random rd = new Random();

    private List<T> storage = new ArrayList<>();

    public void add(T val){
        storage.add(val);
    }

    public T select(){
        return storage.get(rd.nextInt(storage.size()));
    }

    public static void main(String[] args){

        RandomList<String> rl = new RandomList<>();

        String str = "wislie is a good boy";
        for(String data : str.split(" ")){
            rl.add(data);
        }

        System.out.println(rl.select());


        RandomList<Integer> rlInt = new RandomList<>();
        for(int i = 4; i < 100; i++){
            rlInt.add(i);
        }
        System.out.println(rlInt.select());
    }


}

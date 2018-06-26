package chapter_generics.practise_5;

import java.util.*;

public class Ocean {

    //小鱼
    static class LittleFish {
        private static int count = 1;
        private final int id = count++;

        private LittleFish() {
        }

        @Override
        public String toString() {
            return "littlefish-" + id;
        }

        public static Generator<LittleFish> littleFishGenerator = new Generator<LittleFish>() {
            @Override
            public LittleFish next() {
                return new LittleFish();
            }
        };
    }

    //大鱼
    static class BigFish {
        private static int count = 1;
        private final int id = count++;

        private BigFish() {
        }

        @Override
        public String toString() {
            return "bigfish-" + id;
        }

        public static Generator<BigFish> bigFishGenerator = new Generator<BigFish>() {
            @Override
            public BigFish next() {
                return new BigFish();
            }
        };

    }

    //大鱼吃小鱼
    public void eat(BigFish bigFish, LittleFish littleFish ){
        System.out.println(bigFish+" eat "+littleFish);
    }

    public static void main(String[] args) {
        Ocean ocean = new Ocean();
        //大鱼
        List<BigFish> bigFishes = new ArrayList<>();
        Generator.fill(bigFishes, BigFish.bigFishGenerator, 5);
        Random rd = new Random();
        for(int i = 0; i < 20; i++){
            BigFish bigFish = bigFishes.get(rd.nextInt(bigFishes.size()));
            //吃小鱼
            ocean.eat(bigFish, LittleFish.littleFishGenerator.next());
        }
    }
}

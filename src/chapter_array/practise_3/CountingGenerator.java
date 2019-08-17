package chapter_array.practise_3;

import chapter_generics.practise_5.Generator;

/**
 * Created by wislie on 2018/11/25.
 */
public class CountingGenerator {

    public static class Byte implements Generator<java.lang.Byte> {
        private byte index = 0;

        @Override
        public java.lang.Byte next() {
            return index++;
        }
    }

    public static class Character implements Generator<java.lang.Character> {
        private char[] chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray();
        private int index = 0;

        @Override
        public java.lang.Character next() {
            return chars[index++ % chars.length];
        }
    }

    public static class Boolean implements Generator<java.lang.Boolean> {
        private boolean value = false;

        @Override
        public java.lang.Boolean next() {
            value = !value;
            return value;
        }
    }

    public static class Integer implements Generator<java.lang.Integer> {
        private int value = 0;

        @Override
        public java.lang.Integer next() {
            return value++;
        }
    }


    public static class Float implements Generator<java.lang.Float> {
        private float value = 0;

        @Override
        public java.lang.Float next() {
            float result = value;
            value += 1.0;
            return result;
        }
    }

    public static class Double implements Generator<java.lang.Double> {
        private double value = 0;

        @Override
        public java.lang.Double next() {
            double result = value;
            value += 1.0;
            return result;
        }
    }

    public static class Long implements Generator<java.lang.Long> {
        private long value = 0;

        @Override
        public java.lang.Long next() {
            return value++;
        }
    }

    public static class String implements Generator<java.lang.String> {
        private Generator<java.lang.Character> generator = new Character();
        private int len = 7;

        public String(){}
        public String(int length){
            this.len = length;
        }
        @Override
        public java.lang.String next() {
            char[] buf = new char[len];
            for (int i = 0; i < len; i++) {
                buf[i] = generator.next();
            }
            return new java.lang.String(buf);
        }
    }

    private static void test(Class<?> surroundingClass) {
        for (Class<?> type : surroundingClass.getClasses()) {
            try {
                Generator generator = (Generator) type.newInstance();
                System.out.print(generator.getClass().getSimpleName() + " ");
                for (int i = 0; i < 5; i++) {
                    System.out.print(generator.next() + " ");
                }
                System.out.println();
            } catch (InstantiationException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(java.lang.String[] args) {
        test(CountingGenerator.class);
    }

}

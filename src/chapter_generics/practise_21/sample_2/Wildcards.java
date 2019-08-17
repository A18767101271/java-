package chapter_generics.practise_21.sample_2;

import chapter_generics.practise_21.sample_1.Holder;

/**
 * 通配符
 * Created by wislie on 2019/4/29.
 */
public class Wildcards {

    static void rawArgs(Holder holder, Object arg) {
        holder.set(arg);
        Object obj = holder.get();
    }

    static void unboundedArg(Holder<?> holder, Object arg) {
//        holder.set(arg);
        Object obj = holder.get();
    }

    static <T> T exact1(Holder<T> holder) {
        T t = holder.get();
        return t;
    }

    static <T> T exact2(Holder<T> holder, T arg) {
        holder.set(arg);
        T t = holder.get();
        return t;
    }

    static <T> T wildSubtype(Holder<? extends T> holder, T arg) {
//        holder.set(arg);
        T t = holder.get();
        return t;
    }

    static <T> void wildSupertype(Holder<? super T> holder, T arg) {
        holder.set(arg);
//        T t =  holder.get();
    }

    public static void main(String[] args) {
        Holder raw = new Holder();
        Holder<Long> qualified = new Holder<>();
        Holder<?> unbounded = new Holder<>();
        Holder<? extends Long> bounded = new Holder<>();
        Long lng = 1L;
        rawArgs(raw, lng);
        rawArgs(qualified, lng);
        rawArgs(unbounded, lng);
        rawArgs(bounded, lng);

        unboundedArg(raw, lng);
        unboundedArg(qualified, lng);
        unboundedArg(unbounded, lng);
        unboundedArg(bounded, lng);

        exact1(raw);
        exact1(qualified);
        exact1(unbounded);
        exact1(bounded);

        exact2(raw, lng);
        exact2(qualified, lng);
//        exact2(unbounded, lng);
//        exact2(bounded, lng);

        wildSubtype(raw, lng);
        wildSubtype(qualified, lng);
        wildSubtype(unbounded, lng);
        wildSubtype(bounded, lng);

        wildSupertype(raw, lng);
        wildSupertype(qualified, lng);
//        wildSupertype(unbounded, lng);
//        wildSupertype(bounded, lng);

    }
}

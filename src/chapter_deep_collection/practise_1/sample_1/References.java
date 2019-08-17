package chapter_deep_collection.practise_1.sample_1;

import chapter_generics.practise_5.CountObject;

import java.lang.ref.*;
import java.util.LinkedList;

/**
 * 持有引用
 * Created by wislie on 2018/11/22.
 */
public class References {

    private static void checkReference(ReferenceQueue<CountObject> rq) {
        Reference<? extends CountObject> reference = rq.poll();
        if (reference != null) {
            System.out.println("In queue:" + reference.get());
        }
    }

    public static void main(String[] args) {

        int size = 2;
        ReferenceQueue<CountObject> rq = new ReferenceQueue<>();
        LinkedList<SoftReference<CountObject>> softReferenceList = new LinkedList<>();

        LinkedList<WeakReference<CountObject>> weakReferenceList = new LinkedList<>();

        LinkedList<PhantomReference<CountObject>> phantomReferenceList = new LinkedList<>();

        for (int i = 0; i < size; i++) {
            softReferenceList.add(new SoftReference<>(new CountObject(), rq));
            SoftReference<CountObject> softReference = softReferenceList.getLast();
            System.out.println("soft just create:" + softReference.get());
            checkReference(rq);
        }

        for (int i = 0; i < size; i++) {
            weakReferenceList.add(new WeakReference<>(new CountObject(), rq));
            WeakReference<CountObject> weakReference = weakReferenceList.getLast();
            System.out.println("weak just create:" + weakReference.get());
            checkReference(rq);
        }

        for (int i = 0; i < size; i++) {
            phantomReferenceList.add(new PhantomReference<>(new CountObject(), rq));
            PhantomReference<CountObject> phantomReference = phantomReferenceList.getLast();
            System.out.println("phantom just create:" + phantomReference.get());
            checkReference(rq);
        }

        SoftReference<CountObject> softReference = new SoftReference<>(new CountObject());
        System.gc();
        System.out.println("soft gc:" + softReference.get());

        WeakReference<CountObject> weakReference = new WeakReference<>(new CountObject());
        System.gc();
        System.out.println("weak gc:" + weakReference.get());

//        soft just create:CountObject:0
//        soft just create:CountObject:1
//        weak just create:CountObject:2
//        weak just create:CountObject:3
//        phantom just create:null
//        phantom just create:null
//        soft gc:CountObject:6
//        weak gc:null
    }
}

package chapter_collection.sample_6;

/**
 * 其中"+"表示将后面的字母压进栈，而"-"表示"弹出栈顶字母并打印它"
 * Created by wislie on 2018/10/30.
 */
public class LetterStack {

    private static final String letters = "+u+n+c---+e+r+t---+a-+i-+n+t+y---+r+u--+l+e+s---";

    public static void main(String[] args) {

        Stack<Character> stack = new Stack<>();

        boolean add = false;
        for (int i = 0; i < letters.length(); i++) {
            if (letters.charAt(i) == '+') {
                add = true;
            } else if (letters.charAt(i) == '-') {
                add = false;
                Character ch = stack.pop();
                System.out.print(ch + " ");
            } else {
                if (add) {
                    stack.push(letters.charAt(i));
                }
            }
        }
    }
}

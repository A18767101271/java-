package chapter_exception.sample_4;

/**
 * Created by wislie on 2018/11/5.
 */
public class LossMessage {

    void loss() throws CatchLossException {
        throw new CatchLossException();
    }

    void finalEx() throws FinalException{
        throw new FinalException();
    }

    public static void main(String[] args) {

        LossMessage lossMessage = new LossMessage();
        try {
            lossMessage.loss(); //没有catch 会造成异常缺失
        } catch (CatchLossException e) {
            e.printStackTrace();
        }finally {
            try {
                lossMessage.finalEx();
            } catch (FinalException e) {
                e.printStackTrace();
            }
        }
    }
}

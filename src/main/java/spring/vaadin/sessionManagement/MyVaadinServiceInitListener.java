package spring.vaadin.sessionManagement;

import com.vaadin.flow.component.ReconnectDialogConfiguration;
import com.vaadin.flow.component.page.LoadingIndicatorConfiguration;
import com.vaadin.flow.server.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
public class MyVaadinServiceInitListener implements VaadinServiceInitListener,
        SessionInitListener,
        SessionDestroyListener,
        UIInitListener,
        BootstrapInitialPredicate{
    @Override
    public void serviceInit(ServiceInitEvent event) {
        System.err.println("Service initializing");
        VaadinService source = event.getSource();
        source.addSessionInitListener(this);
        source.addSessionDestroyListener(this);
        source.addUIInitListener(this);
        source.setBootstrapInitialPredicate(this);

        source.setSystemMessagesProvider(new SystemMessagesProvider() {
            @Override
            public SystemMessages getSystemMessages(SystemMessagesInfo systemMessagesInfo) {

                Locale locale = systemMessagesInfo.getLocale(); // TODO: 5/31/24 can use to translate messages

                CustomizedSystemMessages messages = new CustomizedSystemMessages();
                messages.setSessionExpiredMessage("Oops session has expired");
                messages.setSessionExpiredCaption("Hey you");
                messages.setSessionExpiredURL("localhost:8080/sessionExpired");
                messages.setCookiesDisabledNotificationEnabled(false);

                return messages;
            }
        });
    }

    @Override
    public void sessionInit(SessionInitEvent event) throws ServiceException {
        System.err.println("Some session init listener");
        HttpSession httpSession = ((VaadinServletRequest) event.getRequest()).getHttpServletRequest().getSession();
        httpSession.setMaxInactiveInterval(30); // Set HTTP session timeout

        event.getSession().getSession().setMaxInactiveInterval(15); // Set Vaadin session timeout
    }

    @Override
    public void sessionDestroy(SessionDestroyEvent event) {
        System.err.println("Session Destroyed");
    }

    @Override
    public void uiInit(UIInitEvent event) {
        System.err.println("UI init");
        LoadingIndicatorConfiguration conf = event.getUI().getLoadingIndicatorConfiguration();
        conf.setApplyDefaultTheme(false);
        conf.setFirstDelay(100);
        conf.setSecondDelay(200);
        conf.setThirdDelay(300);

        ReconnectDialogConfiguration dialConf = event.getUI().getReconnectDialogConfiguration();
        dialConf.setDialogText("Opps, trying to reconnect here");
        dialConf.setDialogTextGaveUp("I've given up reconnecting");
        dialConf.setReconnectAttempts(2);
        dialConf.setReconnectInterval(300);
    }

    @Override
    public boolean includeInitialUidl(VaadinRequest request) {
        System.err.println("Bootstrap here - thing that loads before real components");
        return true;
    }
}

function billApp() {
    return {
        isFinalizing: false,
        searchNumber: '',
        isSaving: false,
        showHistory: false,
        showSettings: false,
        showDashboard: false,
        showLedger: false,
        selectedFY: '',
        availableFYs: [],
        dashboardStats: {
            monthlyRevenue: 0,
            annualRevenue: 0,
            outstanding: 0,
            collected: 0,
            topAccounts: [],
            conversion: { quotes: 0, invoices: 0, rate: 0 },
            docsByType: {},
            activeTab: 'Tax Invoice',
            monthWiseTrend: [],
            taxSummary: { domestic: 0, export: 0, totalGst: 0, taxableDomestic: 0, taxableExport: 0 },
            topProducts: [],
            domesticExportSplit: { domesticCount: 0, exportCount: 0 }
        },
        openingBalance: {
            outstanding: 0
        },
        toasts: [],
        notify(message, type = 'info', duration = 3000) {
            const id = Date.now();
            this.toasts.push({ id, message, type });
            setTimeout(() => {
                this.toasts = this.toasts.filter(t => t.id !== id);
            }, duration);
        },
        complianceStats: {
            score: 85,
            punctuality: 90,
            itcEfficiency: 75,
            dataIntegrity: 95
        },
        ledgerControls: {
            search: '',
            startDate: '',
            endDate: '',
            currency: 'All'
        },
        savedDocs: [],
        showGstDashboard: false,
        showGstHistoryDetail: false,
        showDocViewer: false,
        showProdForm: false,
        gstView: 'returns', // 'returns', 'calendar', 'reports'
        gstReturns: {
            gstr1: { status: 'Draft', period: '' },
            gstr3b: { status: 'Draft', period: '' },
            gstr9: { status: 'Draft', period: '' }
        },
        gstHistory: [],
        showGstr1Details: false,
        showGstr3bPortal: false,
        lastGstr1Result: null,
        lastGstr3bResult: null,
        selectedGstReturn: null,
        viewDoc: null,
        showAccountManager: false,
        accountSearch: '',
        showAccountForm: false,

        showContactManager: false,
        contactSearch: '',
        showContactForm: false,
        contactForm: { id: null, salutation: 'Mr.', first_name: '', last_name: '', account_id: '', account_name: '', title: '', mobile: '', email: '' },

        showProductManager: false,
        showProdForm: false,
        prodForm: {
            id: null,
            desc: '',
            hsn: '',
            rate: 0,
            taxRate: 18,
            type: 'GOODS'
        },
        productSearch: '',
        accountForm: {
            id: null,
            name: '',
            address: '',
            gstin: '',
            state: '',
            pan: '',
            country: 'India',
            currency: 'INR',
            customer_type: 'B2C',
            is_export: false
        },
        gstSettings: {
            taxpayerType: 'Regular', // 'Regular', 'Composition', 'TDS/TCS'
            filingFrequency: 'Monthly', // 'Monthly', 'Quarterly'
            businessCategory: 'Service Provider', // 'Service Provider', 'Trader', 'Manufacturer'
            gstin: '',
            state: 'Telangana',
            stateCode: '36'
        },
        gstReturnTypes: [
            {
                code: 'GSTR-1',
                name: 'GSTR-1',
                description: 'Details of outward supplies (Sales)',
                applicableTo: ['Regular'],
                frequencies: ['Monthly', 'Quarterly'],
                dueDayMonthly: 11,
                dueDayQuarterly: 13
            },
            {
                code: 'GSTR-3B',
                name: 'GSTR-3B',
                description: 'Summary return & tax payment',
                applicableTo: ['Regular'],
                frequencies: ['Monthly', 'Quarterly'],
                dueDayMonthly: 20,
                dueDayQuarterly: { Q1: 22, Q2: 22, Q3: 24, Q4: 24 }
            },
            {
                code: 'CMP-08',
                name: 'CMP-08',
                description: 'Self-assessed tax for Composition dealers',
                applicableTo: ['Composition'],
                frequencies: ['Quarterly'],
                dueDayQuarterly: 18
            }
        ],
        gstFilings: [], // Will store filing records from Supabase

        // Auth State
        user: null,
        profile: null,
        authEmail: '',
        authPassword: '',
        authName: '',
        isLogin: true,
        authLoading: false,

        doc: {
            settings: {
                showSignature: true,
                showCompanyStamp: true,
                showRevenueStamp: true
            },
            company: {
                name: 'LaGa Systems Pvt Ltd',
                tagline: 'House of Scientific Softwares',
                address1: '3rd Floor, Plot No.: 246, Above Central Bank of India',
                address2: 'Road No.:78, Jubilee Hills, Hyderabad 500 033 India',
                cin: 'U72200TG2007PTC053444',
                phone: '+91 40 23549924/8905',
                website: 'www.lagasys.com',
                email: 'info@lagasys.com',
                udyam: 'UDYAM-TS-02-0010670',
                gstin: '36AABCL2941H1ZN',
                pan: 'AABCL2941H'
            },
            revision: 0,
            type: 'Quotation',
            customTitle: '',
            number: '',
            currency: 'INR',
            exchangeRate: 1,
            supplyType: 'DOMESTIC_B2C', // 'EXPORT_LUT', 'DOMESTIC_B2B', 'DOMESTIC_B2C'
            isPosted: false,
            // Purchase Invoice Specifics
            boeNumber: '',
            boeDate: '',
            portCode: '',
            isRcm: false,
            itcEligibility: 'Inputs', // 'Inputs', 'Input Services', 'Capital Goods', 'Ineligible'
            date: new Date().toISOString().split('T')[0],
            validityDate: '',
            paymentTerms: '100% Advance',
            deliveryTime: 'Within 7 Days',
            deliveryMode: 'By Courier/Hand',
            subject: '',
            reference: '',
            challanNo: '',
            challanDate: '',
            transport: '',
            vehicleNo: '',
            poNumber: '',
            poDate: '',
            dueDate: '',
            originalInvoiceNo: '',
            originalInvoiceDate: '',
            reasonForIssue: '',
            isExempt: false,
            isNilRated: false,
            isNonGst: false,

            account: {
                name: '',
                address: '',
                gstin: '',
                state: '',
                country: 'India',
                currency: 'INR'
            },
            items: [
                { desc: '', hsn: '', qty: 1, rate: 0, discount: 0, taxRate: 18, type: 'GOODS' }
            ],
            banks: {
                INR: { name: 'LAGA SYSTEMS PVT LTD', bankName: 'Axis Bank', branch: 'Hyderabad Main Branch (Begumpet)', acc: '008010200057114', ifsc: 'UTIB0000008' },
                USD: { name: 'LAGA SYSTEMS PVT LTD', bankName: 'Axis bank', branch: 'Hyderabad Main (Begumpet)', acc: '910020023367087', ifsc: 'UTIB0000008/AXISINBB008' },
                EUR: { name: 'LAGA SYSTEMS PVT LTD', bankName: 'Sample EUR Bank', branch: 'Frankfurt Branch', acc: 'BE123456789012', ifsc: 'SWIFTEUR456' }
            },
            taxRate: 18
        },

        currencies: [
            { code: 'INR', name: 'Indian Rupee', symbol: '₹', locale: 'en-IN' },
            { code: 'USD', name: 'US Dollar', symbol: '$', locale: 'en-US' },
            { code: 'EUR', name: 'Euro', symbol: '€', locale: 'de-DE' }
        ],

        masterData: {
            accounts: [],
            contacts: [],
            products: []
        },

        globalBanks: {
            INR: { name: 'LAGA SYSTEMS PVT LTD', bankName: 'Axis Bank', branch: 'Hyderabad Main Branch (Begumpet)', acc: '008010200057114', ifsc: 'UTIB0000008' },
            USD: { name: 'LAGA SYSTEMS PVT LTD', bankName: 'Axis bank', branch: 'Hyderabad Main (Begumpet)', acc: '910020023367087', ifsc: 'UTIB0000008/AXISINBB008' },
            EUR: { name: 'LAGA SYSTEMS PVT LTD', bankName: 'Sample EUR Bank', branch: 'Frankfurt Branch', acc: 'BE123456789012', ifsc: 'SWIFTEUR456' }
        },

        allowedTaxSlabs: [0, 5, 18, 40],

        async init() {


            lucide.createIcons();
            this.showGstHistoryDetail = false;
            this.showDocViewer = false;
            console.log('App Init: Checking Auth Session...');

            // Listen for Auth changes
            window.supabase.auth.onAuthStateChange(async (event, session) => {
                console.log('Auth Event:', event);
                if (session) {
                    this.user = session.user;
                    await this.fetchProfile();
                } else {
                    this.user = null;
                    this.profile = null;
                }
                this.$nextTick(() => lucide.createIcons());
            });

            // Initial session check
            const { data: { session } } = await window.supabase.auth.getSession();
            if (session) {
                this.user = session.user;
                await this.fetchProfile();
            } else {
                console.log('No active session found.');
            }

            await this.loadAccounts();
            await this.loadProducts();
            await this.loadGlobalBanks();
            await this.loadCurrentDoc();
            await this.loadHistory();
            await this.loadGstReturns();
            await this.loadGstFilings();
            await this.loadOpeningBalance();

            if (!this.doc.number) {
                this.doc.number = this.getPreviewNumber(this.doc.type);
            }

            this.$watch('doc.date', (newDate) => {
                if (this.doc.number.includes('PREVIEW')) {
                    this.doc.number = this.getPreviewNumber(this.doc.type);
                }
            });

            this.$watch('doc', () => {
                this.saveCurrentDoc();
            }, { deep: true });

            this.generateFYList();
        },

        async loadOpeningBalance() {
            if (!this.user || !this.selectedFY) return;
            const { data, error } = await window.supabase
                .from('opening_balances')
                .select('outstanding')
                .eq('user_id', this.user.id)
                .eq('fy', this.selectedFY)
                .single();
            if (data) {
                this.openingBalance.outstanding = data.outstanding;
            } else {
                this.openingBalance.outstanding = 0;
            }
        },

        async saveOpeningBalance() {
            if (!this.user || !this.selectedFY) return;
            const { error } = await window.supabase
                .from('opening_balances')
                .upsert({
                    user_id: this.user.id,
                    fy: this.selectedFY,
                    outstanding: parseFloat(this.openingBalance.outstanding || 0),
                    updated_at: new Date().toISOString()
                });
            if (error) {
                this.notify('Failed to save opening balance: ' + error.message, 'error');
            } else {
                this.notify('Opening balance saved', 'success');
                this.updateExecutiveStats();
            }
        },

        // --- Auth Methods ---
        async signUp() {
            try {
                this.authLoading = true;
                const { data, error } = await window.supabase.auth.signUp({
                    email: this.authEmail,
                    password: this.authPassword,
                    options: {
                        data: {
                            full_name: this.authName
                        }
                    }
                });
                if (error) throw error;
                this.notify('Check your email for confirmation link', 'info', 6000);
            } catch (err) {
                this.notify(err.message, 'error');
            } finally {
                this.authLoading = false;
            }
        },

        async signIn() {
            try {
                this.authLoading = true;
                const { data, error } = await window.supabase.auth.signInWithPassword({
                    email: this.authEmail,
                    password: this.authPassword
                });
                if (error) throw error;
                this.notify('Logged in successfully!', 'success');
            } catch (err) {
                this.notify(err.message, 'error');
            } finally {
                this.authLoading = false;
            }
        },

        async signOut() {
            console.log('Sign Out Initiated...');
            try {
                await window.supabase.auth.signOut();
                this.notify('Logged out successfully', 'success');
            } catch (err) {
                console.error('Supabase SignOut Error:', err);
                this.notify('Failed to log out: ' + err.message, 'error');
            }
            this.forceLogout();
        },

        forceLogout() {
            console.log('Forcing local state cleanup...');
            this.user = null;
            this.profile = null;

            // Collect all Supabase related keys first
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && (key.includes('supabase.auth.token') || key.startsWith('sb-'))) {
                    keysToRemove.push(key);
                }
            }

            // Remove them thoroughly
            keysToRemove.forEach(k => {
                console.log('Removing:', k);
                localStorage.removeItem(k);
            });

            // Clear current_doc draft as well to be safe
            localStorage.removeItem('current_doc');
            sessionStorage.clear();

            console.log('Cleanup complete. Reloading page...');
            location.reload();
        },

        async fetchProfile(retryCount = 0) {
            if (!this.user) return;
            console.log(`[Auth] Fetching Profile (Attempt ${retryCount + 1}) for:`, this.user.email);

            // EMERGENCY FALLBACK: If email is in admin list, set temporary role so UI works while fetching
            const adminEmails = ['sunkar@lagasys.com', 'vvssunkar@lagasys.com', 'sankar@lagasys.com'];
            if (!this.profile && adminEmails.includes(this.user.email)) {
                console.log('[Auth] Admin email detected. Setting emergency fallback role.');
                this.profile = { full_name: this.user.user_metadata?.full_name || 'Admin User', role: 'admin' };
            }

            try {
                // Timeout wrapper for Supabase call
                const fetchWithTimeout = () => {
                    return new Promise(async (resolve, reject) => {
                        const timeout = setTimeout(() => reject(new Error('Supabase Request Timeout')), 8000);
                        try {
                            const result = await window.supabase
                                .from('profiles')
                                .select('*')
                                .eq('id', this.user.id)
                                .single();
                            clearTimeout(timeout);
                            resolve(result);
                        } catch (e) {
                            clearTimeout(timeout);
                            reject(e);
                        }
                    });
                };

                const { data, error } = await fetchWithTimeout();

                if (error) {
                    console.warn('[Auth] Profile Fetch Error:', error.message);
                    if (error.code === 'PGRST116') {
                        console.log('[Auth] Profile missing. Attempting self-healing insert...');
                        const { data: newProfile, error: createError } = await window.supabase
                            .from('profiles')
                            .insert([{
                                id: this.user.id,
                                full_name: this.user.user_metadata?.full_name || 'Staff User',
                                role: adminEmails.includes(this.user.email) ? 'admin' : 'sales'
                            }])
                            .select()
                            .single();

                        if (!createError && newProfile) {
                            console.log('[Auth] Self-healing success. Role:', newProfile.role);
                            this.profile = { ...newProfile };
                        } else if (retryCount < 2) {
                            setTimeout(() => this.fetchProfile(retryCount + 1), 2000);
                        }
                    } else if (retryCount < 2) {
                        setTimeout(() => this.fetchProfile(retryCount + 1), 2000);
                    }
                } else if (data) {
                    console.log('[Auth] Profile Found. Role:', data.role);
                    this.profile = { ...data };
                }
            } catch (err) {
                console.error('[Auth] Fetch Exception:', err.message);
                if (retryCount < 2) setTimeout(() => this.fetchProfile(retryCount + 1), 2000);
            }

            this.$nextTick(() => {
                lucide.createIcons();
                console.log('[Auth] Initialization Complete. Current Identity:', this.profile?.full_name, `(${this.profile?.role})`);
            });
        },

        // --- Helper for Role Checks ---
        hasRole(roles) {
            if (!this.profile) return false;
            if (Array.isArray(roles)) return roles.includes(this.profile.role);
            return this.profile.role === roles;
        },

        isSales() { return this.profile?.role === 'sales'; },
        isAdmin() { return this.profile?.role === 'admin'; },
        isAccountant() { return this.profile?.role === 'accountant'; },
        isManager() { return this.profile?.role === 'manager'; },

        normalizeTaxRate(val) {
            const slabs = (this.allowedTaxSlabs || [0, 5, 18, 40]).map(Number);
            let n = Number(val);
            if (!isFinite(n)) return 18;
            return slabs.reduce((a, b) => (Math.abs(b - n) < Math.abs(a - n) ? b : a));
        },

        addItem() {
            let defaultTax = 18;
            if (this.doc.supplyType === 'EXPORT_LUT') defaultTax = 0;
            this.doc.items.push({ desc: '', hsn: '', qty: 1, rate: 0, discount: 0, taxRate: this.normalizeTaxRate(this.doc.taxRate || defaultTax) });
            this.$nextTick(() => lucide.createIcons());
        },

        removeItem(index) {
            this.doc.items.splice(index, 1);
        },

        addTnc() {
            this.doc.tnc.push('');
        },

        removeTnc(index) {
            this.doc.tnc.splice(index, 1);
        },

        selectAccountObj(acc) {
            this.doc.account = {
                name: acc.name,
                address: acc.address,
                gstin: acc.gstin,
                state: acc.state,
                pan: acc.pan,
                country: acc.country || 'India',
                currency: acc.currency || 'INR'
            };
            this.doc.currency = acc.currency || 'INR';
            if (this.doc.currency === 'INR') {
                this.doc.exchangeRate = 1;
            }
            this.updateSupplyType();
            this.saveCurrentDoc();
        },

        selectProductObj(index, p) {
            this.doc.items[index].desc = p.desc;
            this.doc.items[index].hsn = p.hsn;
            this.doc.items[index].rate = p.rate;
            this.doc.items[index].taxRate = this.normalizeTaxRate((p.taxRate !== undefined) ? p.taxRate : (this.doc.taxRate || 18));
        },

        async setDocType(type) {
            this.doc.type = type;
            this.doc.customTitle = '';
            this.doc.tnc = (type === 'Delivery Challan')
                ? ['Subject to Hyderabad Jurisdiction.']
                : (type === 'Credit Note' || type === 'Debit Note')
                    ? ['Subject to Hyderabad Jurisdiction.', 'Note being issued as per GST requirements.']
                    : (type === 'Purchase Invoice')
                        ? ['Subject to Hyderabad Jurisdiction.', 'Input Tax Credit to be claimed as per GST rules.']
                        : [
                            'Subject to Hyderabad Jurisdiction.',
                            'The software is warranted for any design defects as per specification for 1 Year.',
                            'The above price doesn\'t include Installation and Training.'
                        ];

            // Set specific defaults for Quotation
            if (type === 'Quotation') {
                this.doc.paymentTerms = '100% Advance';
                this.doc.deliveryTime = 'Within 7 Days';
                this.doc.deliveryMode = 'By Courier/Hand';
            }

            // Set specific defaults for Purchase Invoice
            if (type === 'Purchase Invoice') {
                this.doc.itcEligibility = 'Inputs';
                this.doc.isRcm = false;
            }

            this.doc.number = this.getPreviewNumber(type);
            await this.saveCurrentDoc();
        },

        getDocPrefix(type) {
            if (type === 'Quotation') return 'LGS-QTN';
            if (type === 'Proforma Invoice') return 'LGS-PI';
            if (type === 'Tax Invoice') return 'LGS-TI';
            if (type === 'Delivery Challan') return 'LGS-DC';
            if (type === 'Credit Note') return 'LGS-CN';
            if (type === 'Debit Note') return 'LGS-DN';
            if (type === 'Purchase Invoice') return 'LGS-PUR';
            return 'LGS-DOC';
        },

        getDocCode(type) {
            if (type === 'Quotation') return 'QTN';
            if (type === 'Proforma Invoice') return 'PI';
            if (type === 'Tax Invoice') return 'TI';
            if (type === 'Delivery Challan') return 'DC';
            if (type === 'Credit Note') return 'CN';
            if (type === 'Debit Note') return 'DN';
            if (type === 'Purchase Invoice') return 'PUR';
            return 'DOC';
        },

        getCurrentFY(dateStr) {
            const date = dateStr ? new Date(dateStr) : new Date();
            const year = date.getFullYear();
            const month = date.getMonth(); // 0-indexed (0=Jan, 3=April)

            let startYear, endYear;
            if (month >= 3) { // April to Dec
                startYear = year;
                endYear = (year + 1).toString().slice(-2);
            } else { // Jan to March
                startYear = year - 1;
                endYear = year.toString().slice(-2);
            }
            return `${startYear}-${endYear}`;
        },

        generateFYList() {
            const years = new Set();

            // 1. Add years from transaction data
            this.savedDocs.forEach(doc => {
                if (doc.date) years.add(this.getCurrentFY(doc.date));
            });

            // 2. Add a default range (Current FY + 2 previous FYs)
            const currentFY = this.getCurrentFY();
            years.add(currentFY);

            const [startYearStr] = currentFY.split('-');
            const startYear = parseInt(startYearStr);
            years.add(`${startYear - 1}-${startYear.toString().slice(-2)}`);
            years.add(`${startYear - 2}-${(startYear - 1).toString().slice(-2)}`);

            this.availableFYs = Array.from(years).sort((a, b) => b.localeCompare(a));
            if (!this.selectedFY) this.selectedFY = currentFY;
        },

        setSelectedFY(fy) {
            this.selectedFY = fy;
            this.updateExecutiveStats();
        },

        getFYRange() {
            const now = new Date();
            const month = now.getMonth();
            const year = now.getFullYear();
            let startYear = month < 3 ? year - 1 : year;
            return `Apr ${startYear} - Mar ${startYear + 1}`;
        },

        getPreviewNumber(type) {
            const fy = this.getCurrentFY(this.doc.date);
            const prefix = this.getDocPrefix(type);
            let num = `${prefix}-${fy}-PREVIEW`;
            if (type === 'Quotation' && this.doc.revision > 0) {
                num += `-R${this.doc.revision}`;
            }
            return num;
        },

        async saveToMaster(type) {
            if (type === 'account') {
                await this.saveAccountToDB();
                this.notify('Account saved to database!', 'success');
            }
            if (type === 'product') {
                await this.saveProductsToDB();
                this.notify('Products saved to database!', 'success');
            }
        },

        async saveAccountToDB() {
            await window.supabase.from('accounts').upsert({
                name: this.doc.account.name,
                address: this.doc.account.address,
                gstin: this.doc.account.gstin,
                state: this.doc.account.state,
                pan: this.doc.account.pan
            });
        },

        async loadAccounts() {
            const { data } = await window.supabase
                .from('accounts')
                .select('*')
                .order('name');
            if (data) this.masterData.accounts = data;
        },

        async saveProductsToDB() {
            for (const item of this.doc.items) {
                if (!item.desc) continue;
                await window.supabase.from('products').upsert({
                    desc: item.desc,
                    hsn: item.hsn,
                    rate: item.rate,
                    tax_rate: item.taxRate
                });
            }
        },

        async loadProducts() {
            const { data } = await window.supabase
                .from('products')
                .select('*')
                .order('desc');
            if (data) {
                this.masterData.products = data.map(p => ({
                    id: p.id,
                    desc: p.desc,
                    hsn: p.hsn,
                    rate: p.rate,
                    taxRate: p.tax_rate
                }));
            }
        },

        // --- Product Master Management ---
        openProductManager() {
            this.showProductManager = true;
            this.showProdForm = false;
            this.prodForm = { id: null, desc: '', hsn: '', rate: 0, taxRate: 18, type: 'GOODS' };
            this.$nextTick(() => lucide.createIcons());
        },

        resetProductForm() {
            this.prodForm = { id: null, desc: '', hsn: '', rate: 0, taxRate: 18, type: 'GOODS' };
            this.showProdForm = true;
            this.$nextTick(() => lucide.createIcons());
        },

        editProduct(product) {
            this.prodForm = { ...product };
            this.showProdForm = true;
            this.$nextTick(() => lucide.createIcons());
        },

        async saveProductForm() {
            if (!this.prodForm.desc) {
                this.notify('Description is required', 'warning');
                return;
            }

            const payload = {
                desc: this.prodForm.desc,
                hsn: this.prodForm.hsn,
                rate: parseFloat(this.prodForm.rate) || 0,
                tax_rate: parseInt(this.prodForm.taxRate) || 18,
                type: this.prodForm.type || 'GOODS'
            };

            if (this.prodForm.id) {
                payload.id = this.prodForm.id;
            }

            let query = window.supabase.from('products');
            const { error } = await query.upsert(payload);

            if (error) {
                console.error('Save Product Error:', error);
                this.notify('Failed to save product: ' + error.message, 'error');
                return;
            }

            this.notify(this.prodForm.id ? 'Product updated successfully!' : 'Product added successfully!', 'success');
            this.showProdForm = false;
            this.resetProductFormManual(); // Helper to reset without toggling view
            await this.loadProducts();
            this.$nextTick(() => lucide.createIcons());
        },

        resetProductFormManual() {
            this.prodForm = { id: null, desc: '', hsn: '', rate: 0, taxRate: 18 };
        },

        async deleteProduct(id) {
            if (!confirm('Are you sure you want to delete this product?')) return;

            const { error } = await window.supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) {
                this.notify('Failed to delete: ' + error.message, 'error');
            } else {
                this.notify('Product deleted', 'success');
                this.showProdForm = false;
                await this.loadProducts();
            }
        },

        // --- Account Master Management ---
        openAccountManager() {
            this.showAccountManager = true;
            this.showAccountForm = false;
            this.accountForm = { id: null, name: '', address: '', gstin: '', state: '', pan: '', country: 'India', currency: 'INR', customer_type: 'B2C', is_export: false };
            this.$nextTick(() => lucide.createIcons());
        },

        resetAccountForm() {
            this.accountForm = { id: null, name: '', address: '', gstin: '', state: '', pan: '', country: 'India', currency: 'INR', customer_type: 'B2C', is_export: false };
            this.showAccountForm = true;
            this.$nextTick(() => lucide.createIcons());
        },

        editAccount(account) {
            this.accountForm = { ...account };
            this.showAccountForm = true;
            this.$nextTick(() => lucide.createIcons());
        },

        async saveAccountForm() {
            if (!this.accountForm.name) {
                this.notify('Account Name is required', 'warning');
                return;
            }

            // Auto-derivation logic
            const isExport = this.accountForm.country !== 'India';
            const customerType = isExport ? 'B2B' : (this.accountForm.gstin ? 'B2B' : 'B2C');

            const payload = {
                name: this.accountForm.name,
                address: this.accountForm.address,
                gstin: this.accountForm.gstin,
                state: this.accountForm.state,
                pan: this.accountForm.pan,
                country: this.accountForm.country || 'India',
                currency: this.accountForm.currency || 'INR',
                customer_type: customerType,
                is_export: isExport,
                lut_applicable: isExport
            };

            if (this.accountForm.id) {
                payload.id = this.accountForm.id;
            }

            let query = window.supabase.from('accounts');
            const { error } = await query.upsert(payload);

            if (error) {
                console.error('Save Account Error:', error);
                this.notify('Failed to save account: ' + error.message, 'error');
                return;
            }

            this.notify('Account saved successfully!', 'success');
            this.showAccountForm = false;
            this.resetAccountFormManual();
            await this.loadAccounts(); // Reload list
            this.$nextTick(() => lucide.createIcons());
        },

        resetAccountFormManual() {
            this.accountForm = { id: null, name: '', address: '', gstin: '', state: '', pan: '', country: 'India', currency: 'INR', customer_type: 'B2C', is_export: false };
        },

        async deleteAccount(id) {
            if (!confirm('Are you sure you want to delete this account?')) return;

            const { error } = await window.supabase
                .from('accounts')
                .delete()
                .eq('id', id);

            if (error) {
                this.notify('Failed to delete: ' + error.message, 'error');
            } else {
                this.notify('Account deleted', 'success');
                await this.loadAccounts();
            }
        },

        // --- Contact Master Management ---
        openContactManager() {
            this.showContactManager = true;
            this.showContactForm = false;
            this.contactForm = { id: null, salutation: 'Mr.', first_name: '', last_name: '', account_id: '', account_name: '', title: '', mobile: '', email: '' };
            this.loadContacts();
            this.$nextTick(() => lucide.createIcons());
        },

        async loadContacts() {
            const { data } = await window.supabase
                .from('contacts')
                .select('*, accounts(name)')
                .order('first_name');
            if (data) {
                this.masterData.contacts = data.map(c => ({
                    ...c,
                    account_name: c.accounts?.name || ''
                }));
            }
        },

        resetContactForm() {
            this.contactForm = { id: null, salutation: 'Mr.', first_name: '', last_name: '', account_id: '', account_name: '', title: '', mobile: '', email: '' };
            this.showContactForm = true;
            this.$nextTick(() => lucide.createIcons());
        },

        editContact(contact) {
            this.contactForm = { ...contact };
            this.showContactForm = true;
            this.$nextTick(() => lucide.createIcons());
        },

        async saveContactForm() {
            if (!this.contactForm.first_name || !this.contactForm.last_name) {
                this.notify('First and Last Name are required', 'warning');
                return;
            }

            const payload = {
                salutation: this.contactForm.salutation,
                first_name: this.contactForm.first_name,
                last_name: this.contactForm.last_name,
                account_id: this.contactForm.account_id || null,
                title: this.contactForm.title,
                mobile: this.contactForm.mobile,
                email: this.contactForm.email
            };

            if (this.contactForm.id) {
                payload.id = this.contactForm.id;
            }

            const { error } = await window.supabase
                .from('contacts')
                .upsert(payload);

            if (error) {
                console.error('Save Contact Error:', error);
                this.notify('Failed to save contact: ' + error.message, 'error');
                return;
            }

            this.notify('Contact saved successfully!', 'success');
            this.showContactForm = false;
            await this.loadContacts();
            this.$nextTick(() => lucide.createIcons());
        },

        async deleteContact(id) {
            if (!confirm('Are you sure you want to delete this contact?')) return;

            const { error } = await window.supabase
                .from('contacts')
                .delete()
                .eq('id', id);

            if (error) {
                this.notify('Failed to delete: ' + error.message, 'error');
            } else {
                this.notify('Contact deleted', 'success');
                await this.loadContacts();
            }
        },

        async loadDocumentByNumber() {
            if (!this.searchNumber) {
                this.notify('Please enter a document number', 'warning');
                return;
            }
            const { data, error } = await window.supabase
                .from('documents')
                .select('*')
                .eq('number', this.searchNumber)
                .single();
            if (error || !data) {
                this.notify('Document not found', 'error');
                return;
            }
            this.doc = { ...this.doc, ...data };
            this.searchNumber = '';
            this.notify(`Loaded ${data.status} document`, 'success');
        },

        async saveGlobalBanks() {
            await window.supabase.from('global_banks').upsert({
                key: 'default',
                data: {
                    globalBanks: this.globalBanks,
                    companyDetails: this.doc.company,
                    gstSettings: this.gstSettings
                },
                updated_at: new Date()
            });
            this.notify('Settings saved', 'success');
        },

        async loadGlobalBanks() {
            const { data, error } = await window.supabase
                .from('global_banks')
                .select('data')
                .eq('key', 'default')
                .single();
            if (data && data.data) {
                if (data.data.globalBanks) this.globalBanks = data.data.globalBanks;
                if (data.data.companyDetails) this.doc.company = data.data.companyDetails;
                if (data.data.gstSettings) this.gstSettings = data.data.gstSettings;
            }
        },

        resetGlobalBanks() {
            if (!confirm('Reset global bank defaults to sample values?')) return;
            this.globalBanks = {
                USD: { name: 'LAGA SYSTEMS PVT LTD', bankName: 'Sample USD Bank', branch: 'NY Branch', acc: '', ifsc: '' },
                EUR: { name: 'LAGA SYSTEMS PVT LTD', bankName: 'Sample EUR Bank', branch: 'Frankfurt Branch', acc: '', ifsc: '' }
            };
            this.saveGlobalBanks();
        },

        async saveCurrentDoc() {
            if (!this.user) return;
            await window.supabase.from('current_doc').upsert({
                id: this.user.id,
                data: this.doc,
                updated_at: new Date()
            });
        },

        async loadHistory() {
            const { data, error } = await window.supabase
                .from('documents')
                .select('*')
                .order('created_at', { ascending: false });
            if (!error) {
                this.savedDocs = data;
                this.generateFYList();
                this.updateExecutiveStats();
            }
        },

        async toggleDocStatus(doc) {
            const newStatus = doc.status === 'PAID' ? 'UNPAID' : 'PAID';

            // Optimistic update
            doc.status = newStatus;

            const { error } = await window.supabase
                .from('documents')
                .update({ status: newStatus })
                .eq('id', doc.id);

            if (error) {
                console.error('Error updating status:', error);
                // Revert on error
                doc.status = newStatus === 'PAID' ? 'UNPAID' : 'PAID';
                this.notify('Failed to update status: ' + error.message, 'error');
            } else {
                this.notify('Document status updated to ' + newStatus, 'success');
                // Update stats if needed
                this.updateExecutiveStats();
            }
        },

        loadHistoryDoc(index) {
            if (confirm('Load this document? Unsaved changes in current document will be lost.')) {
                const saved = JSON.parse(JSON.stringify(this.savedDocs[index]));
                this.doc = {
                    ...this.doc,
                    ...saved,
                    revision: saved.revision || 0
                };
                this.showHistory = false;
                this.saveCurrentDoc();
                this.notify('Document loaded from history', 'info');
            }
        },

        async deleteHistoryDoc(index) {
            const doc = this.savedDocs[index];
            if (confirm(`Are you sure you want to delete ${doc.number}?`)) {
                const { error } = await window.supabase
                    .from('documents')
                    .delete()
                    .eq('number', doc.number);
                if (!error) {
                    this.savedDocs.splice(index, 1);
                    this.notify('Document deleted successfully', 'success');
                } else {
                    this.notify('Failed to delete document: ' + error.message, 'error');
                }
            }
        },

        async loadCurrentDoc() {
            if (!this.user) return;
            const { data } = await window.supabase
                .from('current_doc')
                .select('data')
                .eq('id', this.user.id)
                .single();
            if (data && data.data) {
                this.doc = { ...this.doc, ...data.data };
                if (!this.doc.banks) {
                    this.doc.banks = JSON.parse(JSON.stringify(this.globalBanks));
                }
                if (this.doc.revision === undefined) this.doc.revision = 0;
            }
        },

        resetDoc() {
            if (confirm('Are you sure you want to clear this document and start fresh?')) {
                this.doc.settings = { showSignature: true, showCompanyStamp: true, showRevenueStamp: true };
                this.doc.revision = 0;
                this.doc.date = new Date().toISOString().split('T')[0];
                this.doc.validityDate = '';
                this.doc.paymentTerms = '';
                this.doc.deliveryTime = '';
                this.doc.deliveryMode = '';
                this.doc.subject = '';
                this.doc.reference = '';
                this.doc.poNumber = '';
                this.doc.poDate = '';
                this.doc.dueDate = '';
                this.doc.originalInvoiceNo = '';
                this.doc.originalInvoiceDate = '';
                this.doc.reasonForIssue = '';
                this.doc.number = '';
                this.doc.isPosted = false;
                this.doc.currency = 'INR';
                this.doc.exchangeRate = 1;
                this.doc.account = { name: '', address: '', gstin: '', state: '', pan: '', country: 'India' };
                this.updateSupplyType();
                this.doc.taxRate = 18;
                this.doc.items = [{ desc: '', hsn: '', qty: 1, rate: 0, discount: 0, taxRate: 18 }];
                this.doc.tnc = (this.doc.type === 'Delivery Challan')
                    ? ['Subject to Hyderabad Jurisdiction.']
                    : [
                        'Subject to Hyderabad Jurisdiction.',
                        'The software is warranted for any design defects as per specification for 1 Year from the date of supply.',
                        'The above price doesn\'t include Installation and Training.'
                    ];
                this.doc.banks = {
                    INR: { name: 'LAGA SYSTEMS PVT LTD', bankName: 'Axis Bank', branch: 'Hyderabad Main Branch (Begumpet)', acc: '008010200057114', ifsc: 'UTIB0000008' },
                    USD: { name: 'LAGA SYSTEMS PVT LTD', bankName: 'Axis bank', branch: 'Hyderabad Main (Begumpet)', acc: '910020023367087', ifsc: 'UTIB0000008/AXISINBB008' },
                    EUR: { name: 'LAGA SYSTEMS PVT LTD', bankName: 'Sample EUR Bank', branch: 'Frankfurt Branch', acc: 'BE123456789012', ifsc: 'SWIFTEUR456' }
                };
                this.saveCurrentDoc();
                this.notify('Document cleared', 'info');
            }
        },

        itemTaxableValue(item, docType) {
            const currentType = docType || this.doc.type;
            const amount = (Number(item.qty) * Number(item.rate));
            const discountAmt = (currentType === 'Quotation') ? amount * (Number(item.discount || 0) / 100) : 0;
            return amount - discountAmt;
        },

        itemTaxAmount(item, docType) {
            const isPurchase = (docType || this.doc.type) === 'Purchase Invoice';
            const isExportLUT = this.doc.supplyType === 'EXPORT_LUT' && this.doc.currency !== 'INR';

            // For exports under LUT, tax is 0. 
            // For imports, tax (IGST) is usually paid at customs even if vendor is foreign.
            if (!isPurchase && isExportLUT) return 0;

            const currentType = docType || this.doc.type;
            const ratePercent = Number((item.taxRate !== undefined) ? item.taxRate : (this.doc.taxRate || 18));
            return this.itemTaxableValue(item, currentType) * (ratePercent / 100);
        },

        // Resilient calculation for any doc (used for History/GST)
        // Resilient calculation for any doc (used for History/GST)
        getDocTotals(doc, force = false) {
            if (!force && doc.totals && doc.totals.subtotal !== undefined) {
                return doc.totals;
            }
            // Fallback: Calculate from items
            const subt = (doc.items || []).reduce((sum, item) => {
                const amount = (Number(item.qty) * Number(item.rate));
                const discountAmt = (doc.type === 'Quotation') ? amount * (Number(item.discount || 0) / 100) : 0;
                return sum + (amount - discountAmt);
            }, 0);
            const tax = (doc.items || []).reduce((sum, item) => {
                if (doc.supplyType === 'EXPORT_LUT' && doc.currency !== 'INR') return sum;
                const amount = (Number(item.qty) * Number(item.rate));
                const discountAmt = (doc.type === 'Quotation') ? amount * (Number(item.discount || 0) / 100) : 0;
                const taxable = amount - discountAmt;
                const rate = Number((item.taxRate !== undefined) ? item.taxRate : (doc.taxRate || 18));
                return sum + (taxable * (rate / 100));
            }, 0);
            return { subtotal: subt, tax: tax, total: subt + tax, exchangeRate: doc.exchangeRate || 1 };
        },

        itemTotal(item) {
            return this.itemTaxableValue(item) + this.itemTaxAmount(item);
        },

        hasDiscount() {
            return this.doc.items.some(item => Number(item.discount) > 0);
        },

        subTotal() {
            return this.doc.items.reduce((sum, item) => sum + this.itemTaxableValue(item), 0);
        },

        isInterstate() {
            return this.isIGST(this.doc);
        },

        cgstAmount() {
            if (this.isIGST(this.doc)) return 0;
            return this.doc.items.reduce((sum, item) => sum + (this.itemTaxAmount(item) / 2), 0);
        },

        sgstAmount() {
            if (this.isIGST(this.doc)) return 0;
            return this.doc.items.reduce((sum, item) => sum + (this.itemTaxAmount(item) / 2), 0);
        },

        igstAmount() {
            if (!this.isIGST(this.doc)) return 0;
            return this.doc.items.reduce((sum, item) => sum + this.itemTaxAmount(item), 0);
        },

        taxAmount() {
            return this.cgstAmount() + this.sgstAmount() + this.igstAmount();
        },

        bankChargesValue() {
            if (this.doc.currency === 'INR') return 0;
            return Number(this.doc.bankChargesAmount || 0);
        },

        grandTotalRaw() {
            return this.subTotal() + this.taxAmount() + this.bankChargesValue();
        },

        roundOff() {
            return Math.round(this.grandTotalRaw()) - this.grandTotalRaw();
        },

        grandTotal() {
            return Math.round(this.grandTotalRaw());
        },



        updateSupplyType() {
            const acc = this.doc.account;
            const isPurchase = this.doc.type === 'Purchase Invoice';

            if (acc.country && acc.country !== 'India') {
                this.doc.supplyType = isPurchase ? 'IMPORT_GOODS' : 'EXPORT_LUT';
                // Automatically set tax rate to 0 for exports (but for imports, IGST is often paid)
                if (!isPurchase) {
                    this.doc.items.forEach(item => item.taxRate = 0);
                }
            } else if (acc.gstin && acc.gstin.trim() !== '') {
                this.doc.supplyType = isPurchase ? 'PURCHASE_B2B' : 'DOMESTIC_B2B';
            } else {
                this.doc.supplyType = isPurchase ? 'PURCHASE_B2C' : 'DOMESTIC_B2C';
            }
        },

        getExportRemark() {
            if (this.doc.supplyType === 'EXPORT_LUT') {
                return "Supply meant for export under LUT without payment of IGST";
            }
            return "";
        },

        totalQty() {
            return this.doc.items.reduce((sum, item) => sum + Number(item.qty), 0);
        },

        formatCurrency(num) {
            const curr = this.currencies.find(c => c.code === (this.doc.currency || 'INR'));
            const locale = curr ? curr.locale : 'en-IN';
            return Number(num).toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        },

        getCurrencySymbol() {
            const curr = this.currencies.find(c => c.code === (this.doc.currency || 'INR'));
            return curr ? curr.symbol : '₹';
        },

        ensureBankExists() {
            const currency = this.doc.currency || 'INR';
            if (!this.doc.banks) this.doc.banks = {};
            if (!this.doc.banks[currency]) {
                // Try globalBanks first, then default to empty
                this.doc.banks[currency] = this.globalBanks[currency] ?
                    JSON.parse(JSON.stringify(this.globalBanks[currency])) :
                    { name: '', bankName: '', acc: '', branch: '', ifsc: '' };
            }
        },

        bankForCurrency() {
            const currency = this.doc.currency || 'INR';
            this.ensureBankExists(); // Double check
            return this.doc.banks[currency];
        },

        formatDate(dateStr) {
            if (!dateStr) return '';
            // Handle ISO timestamps from Supabase
            if (dateStr.includes('T')) {
                const date = new Date(dateStr);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}-${month}-${year}`;
            }
            const parts = dateStr.split('-');
            if (parts.length !== 3) return dateStr;
            return `${parts[2]}-${parts[1]}-${parts[0]}`;
        },

        getAuditStamp() {
            const now = new Date();
            const date = now.toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
            const time = now.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
            const userName = this.profile?.full_name || 'Staff User';
            return `Generated and printed by ${userName} on ${date} at ${time}`;
        },

        formatPercent(p) {
            const n = Number(p);
            if (!isFinite(n)) return '';
            return Number.isInteger(n) ? `${n}%` : `${n.toFixed(2)}%`;
        },

        formatSplitPercent(p) {
            const n = Number(p);
            if (!isFinite(n)) return '';
            const half = n / 2;
            const halfStr = Number.isInteger(half) ? `${half}%` : `${half.toFixed(2)}%`;
            return `${halfStr} + ${halfStr}`;
        },

        summaryTaxRate() {
            if (!Array.isArray(this.doc.items) || this.doc.items.length === 0) return null;
            const rates = Array.from(new Set(this.doc.items.map(i => Number(i.taxRate !== undefined ? i.taxRate : (this.doc.taxRate || 18)))));
            return rates.length === 1 ? rates[0] : null;
        },

        async getNextNumberFromSupabase(type) {
            try {
                const fy = this.getCurrentFY(this.doc.date);
                const docCode = this.getDocCode(type);
                // Extract start year as integer for database compatibility (p_year expects INT)
                const startYear = parseInt(fy.split('-')[0]);

                console.log('Requesting next number for:', { type, docCode, fy, startYear });

                const { data, error } = await window.supabase.rpc('next_document_number', {
                    p_type: docCode,
                    p_year: startYear
                });

                if (error) {
                    console.error('Supabase RPC Error:', error);
                    throw new Error(`Database error: ${error.message}. (Year attempted: ${startYear})`);
                }

                const prefix = this.getDocPrefix(type);
                let num = `${prefix}-${fy}-${String(data).padStart(3, '0')}`;
                if (type === 'Quotation' && this.doc.revision > 0) {
                    num += `-R${this.doc.revision}`;
                }
                return num;
            } catch (err) {
                console.error('Error in getNextNumberFromSupabase:', err);
                throw err;
            }
        },

        async savePDF() {
            try {
                this.isSaving = true;
                let finalNumber = this.doc.number;
                // Only get a new serial number from sequence if current is a preview or empty
                if (finalNumber.includes('PREVIEW') || !finalNumber) {
                    finalNumber = await this.getNextNumberFromSupabase(this.doc.type);
                    this.doc.number = finalNumber;
                }

                console.log('Finalizing document:', finalNumber);

                // --- GST Compliance Hard Block ---
                const validation = await this.validateGstCompliance(this.doc);
                if (!validation.valid) {
                    this.notify('Compliance Error: ' + validation.errors.join(' | '), 'error', 10000);
                    this.isSaving = false;
                    return;
                }

                const payload = {
                    type: this.doc.type,
                    number: finalNumber,
                    revision: this.doc.revision || 0,
                    date: this.doc.date,
                    currency: this.doc.currency,
                    exchangeRate: this.doc.exchangeRate || 1,
                    supplyType: this.doc.supplyType || 'DOMESTIC_B2C',
                    isPosted: true, // Permanent lock
                    account: this.doc.account,
                    items: this.doc.items,
                    banks: this.doc.banks,
                    totals: {
                        subtotal: this.subTotal(),
                        tax: this.taxAmount(),
                        total: this.grandTotal()
                    },
                    poNumber: this.doc.poNumber || '',
                    poDate: this.doc.poDate || '',
                    boeNumber: this.doc.boeNumber || '',
                    boeDate: this.doc.boeDate || '',
                    portCode: this.doc.portCode || '',
                    isRcm: !!this.doc.isRcm,
                    itcEligibility: this.doc.itcEligibility || 'Inputs',
                    tnc: this.doc.tnc,
                    settings: this.doc.settings,
                    status: 'FINAL',
                    created_by: this.user?.id
                };

                const { error: saveError } = await window.supabase.from('documents').insert(payload);
                if (saveError) {
                    console.error('Final save error:', saveError);
                    this.notify('Permanent save failed: ' + saveError.message, 'error');
                    return;
                }

                const element = document.getElementById('document-preview');
                const fileName = finalNumber.replace(/[/\\?%*:|"<>]/g, '_') + '.pdf';
                const oldTitle = document.title;
                document.title = fileName.replace('.pdf', '');

                console.log('Generating PDF:', fileName);
                await html2pdf().set({
                    margin: 0,
                    filename: fileName,
                    image: { type: 'png', quality: 1.0 },
                    html2canvas: { scale: 3, useCORS: true },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                }).from(element).save();

                document.title = oldTitle;
                this.doc.isPosted = true; // Lock the current draft too
                await this.saveCurrentDoc();
                await this.resetDraftOnly();
                await this.loadHistory();
                this.notify('Document posted and PDF generated successfully!', 'success');
            } catch (err) {
                console.error('Save PDF Error:', err);
                this.notify('Error saving PDF: ' + (err.message || err), 'error');
            } finally {
                this.isSaving = false;
            }
        },

        async resetDraftOnly() {
            this.doc.number = '';
            this.doc.isPosted = false;
            this.doc.currency = 'INR';
            this.doc.exchangeRate = 1;
            this.doc.account = { name: '', address: '', gstin: '', state: '', pan: '', country: 'India' };
            this.doc.items = [{ desc: '', hsn: '', qty: 1, rate: 0, discount: 0, taxRate: 18, type: 'GOODS' }];
            this.doc.subject = '';
            this.doc.reference = '';
            this.doc.poNumber = '';
            this.doc.poDate = '';
            this.doc.dueDate = '';
            this.doc.boeNumber = '';
            this.doc.boeDate = '';
            this.doc.portCode = '';
            this.doc.isRcm = false;
            this.doc.itcEligibility = 'Inputs';
            this.doc.originalInvoiceNo = '';
            this.doc.originalInvoiceDate = '';
            this.doc.reasonForIssue = '';
            this.updateSupplyType();
            await this.saveCurrentDoc();
        },

        numberToWords(n, currencyCode = 'INR') {
            if (n < 0) return "Negative " + this.numberToWords(-n, currencyCode);
            const curr = (this.currencies || []).find(c => c.code === (currencyCode || 'INR'));
            let currencyWord = 'RUPEES';
            let subunitWord = 'PAISE';

            if (curr && curr.name) {
                const parts = curr.name.split(' ');
                let last = parts[parts.length - 1].toUpperCase();
                if (!last.endsWith('S')) last = last + 'S';
                currencyWord = last;
                if (currencyCode === 'USD' || currencyCode === 'EUR') subunitWord = 'CENTS';
            }

            const whole = Math.floor(n);
            const fraction = Math.round((n - whole) * 100);

            if (n === 0) return `ZERO ${currencyWord} ONLY`;

            const single = ["", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE"];
            const double = ["TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN"];
            const tens = ["", "TEN", "TWENTY", "THIRTY", "FORTY", "FIFTY", "SIXTY", "SEVENTY", "EIGHTY", "NINETY"];

            const formatNum = (num) => {
                let str = "";
                if (num > 99) {
                    str += single[Math.floor(num / 100)] + " HUNDRED ";
                    num %= 100;
                }
                if (num > 19) {
                    str += tens[Math.floor(num / 10)] + " ";
                    num %= 10;
                }
                if (num > 9) {
                    str += double[num - 10] + " ";
                } else if (num > 0) {
                    str += single[num] + " ";
                }
                return str;
            };

            let res = "";
            if (currencyCode === 'INR') {
                const formatIndian = (num, suffix) => {
                    if (num === 0) return "";
                    return formatNum(num) + suffix + " ";
                };
                res += formatIndian(Math.floor(whole / 10000000), "CRORE");
                res += formatIndian(Math.floor((whole / 100000) % 100), "LAKH");
                res += formatIndian(Math.floor((whole / 1000) % 100), "THOUSAND");
                res += formatNum(whole % 1000);
            } else {
                const formatInternational = (num, suffix) => {
                    if (num === 0) return "";
                    return formatNum(num) + suffix + " ";
                };
                res += formatInternational(Math.floor(whole / 1000000), "MILLION");
                res += formatInternational(Math.floor((whole / 1000) % 1000), "THOUSAND");
                res += formatNum(whole % 1000);
            }

            let finalStr = res.trim() + ` ${currencyWord}`;
            if (fraction > 0) {
                finalStr += " AND " + formatNum(fraction).trim() + ` ${subunitWord}`;
            }
            return (finalStr + " ONLY").replace(/\s+/g, ' ');
        },

        openEmailClient() {
            const accountName = this.doc.account.name || 'Account';
            const number = this.doc.number || 'Draft';
            const type = this.doc.type;
            const subject = `${type} #${number} from LaGa Systems Pvt Ltd`;
            const total = this.grandTotal();
            const amountStr = this.formatCurrency(total);
            const body =
                `Dear ${accountName},\n\n` +
                `Please find attached the ${type} #${number} dated ${this.doc.date} for ${this.getCurrencySymbol()}${amountStr}.\n\n` +
                `Kindly review and process at your earliest convenience.\n\n` +
                `Regards,\n` +
                `LaGa Systems Pvt Ltd\n` +
                `Hyderabad`;

            window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
        },

        async copyEmailDraft() {
            const accountName = this.doc.account.name || 'Account';
            const number = this.doc.number || 'Draft';
            const type = this.doc.type;
            const subject = `${type} #${number} from LaGa Systems Pvt Ltd`;
            const total = this.grandTotal();
            const amountStr = this.formatCurrency(total);
            const body =
                `Subject: ${subject}\n\n` +
                `Dear ${accountName},\n\n` +
                `Please find attached the ${type} #${number} dated ${this.doc.date} for ${this.getCurrencySymbol()}${amountStr}.\n\n` +
                `Kindly review and process at your earliest convenience.\n\n` +
                `Regards,\n` +
                `LaGa Systems Pvt Ltd\n` +
                `Hyderabad`;

            try {
                await navigator.clipboard.writeText(body);
                this.notify('Email draft copied to clipboard!', 'success');
            } catch (err) {
                console.error('Failed to copy:', err);
                this.notify('Failed to copy to clipboard', 'error');
            }
        },

        // Duplicate document feature
        async duplicateDoc(savedDoc) {
            if (confirm(`Duplicate document ${savedDoc.number}?`)) {
                this.doc = JSON.parse(JSON.stringify(savedDoc));
                this.doc.date = new Date().toISOString().split('T')[0];
                this.doc.number = this.getPreviewNumber(this.doc.type);
                this.showHistory = false;
                await this.saveCurrentDoc();
                this.notify('Document duplicated! Document number reset to preview.', 'success');
            }
        },

        applyRevision() {
            if (this.doc.type !== 'Quotation') return;
            let base = this.doc.number.split('-R')[0];
            if (base.includes('PREVIEW')) {
                this.doc.number = this.getPreviewNumber('Quotation');
            } else {
                this.doc.number = (this.doc.revision > 0) ? `${base}-R${this.doc.revision}` : base;
            }
        },

        // --- GST Module Helpers ---
        getGstStateCode(gstin) {
            if (!gstin || gstin.length < 2) return '';
            return gstin.substring(0, 2);
        },

        isB2B(account) {
            return account && account.gstin && account.gstin.length === 15;
        },

        calculateGstDueDate(type, month, year, frequency) {
            if (type === 'GSTR-1') {
                return frequency === 'Monthly' ? `11th ${month}` : `13th ${month}`;
            }
            if (type === 'GSTR-3B') {
                return '20th';
            }
            if (type === 'CMP-08') {
                return '18th';
            }
            return '';
        },

        getGstDashboardStats() {
            if (!this.selectedFY) return { b2bCount: 0, b2cCount: 0, totalTaxable: 0, totalGst: 0 };

            const [startYearStr] = this.selectedFY.split('-');
            const startYear = parseInt(startYearStr);
            const fyStartDate = new Date(startYear, 3, 1); // April 1st
            const fyEndDate = new Date(startYear + 1, 2, 31, 23, 59, 59); // March 31st

            const docs = this.savedDocs.filter(d => {
                const docDate = new Date(d.date);
                return (
                    (d.type === 'Tax Invoice' ||
                        d.type === 'Purchase Invoice' ||
                        d.type === 'Credit Note' ||
                        d.type === 'Debit Note') &&
                    docDate >= fyStartDate && docDate <= fyEndDate
                );
            });

            let b2bCount = 0;
            let b2cCount = 0;
            let totalTaxable = 0;
            let totalGst = 0;
            let totalItc = 0;

            docs.forEach(doc => {
                const isB2B = this.isB2B(doc.account);
                const docStats = this.getDocTotals(doc);
                const exRate = doc.exchangeRate || 1;
                const taxable = docStats.subtotal * exRate;
                const gst = docStats.tax * exRate;

                if (doc.type === 'Purchase Invoice') {
                    totalItc += gst;
                } else {
                    if (isB2B) b2bCount++; else b2cCount++;
                    if (doc.type === 'Credit Note') {
                        totalTaxable -= taxable;
                        totalGst -= gst;
                    } else {
                        totalTaxable += taxable;
                        totalGst += gst;
                    }
                }
            });

            return { b2bCount, b2cCount, totalTaxable, totalGst, totalItc };
        },

        updateExecutiveStats() {
            if (!this.selectedFY) return;

            const [startYearStr] = this.selectedFY.split('-');
            const startYear = parseInt(startYearStr);
            const fyStartDate = new Date(startYear, 3, 1); // April 1st
            const fyEndDate = new Date(startYear + 1, 2, 31, 23, 59, 59); // March 31st

            const now = new Date();
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();

            const currentTab = this.dashboardStats ? this.dashboardStats.activeTab : 'Quotation';

            const newStats = {
                monthlyRevenue: 0,
                annualRevenue: 0,
                outstanding: 0,
                collected: 0,
                topAccounts: [],
                activeTab: currentTab,
                conversion: { quotes: 0, invoices: 0, rate: 0 },
                docsByType: {
                    'Quotation': [], 'Proforma Invoice': [], 'Tax Invoice': [],
                    'Purchase Invoice': [], 'Delivery Challan': [], 'Credit Note': [], 'Debit Note': []
                },
                monthWiseTrend: [
                    { month: 'Apr', value: 0 }, { month: 'May', value: 0 }, { month: 'Jun', value: 0 },
                    { month: 'Jul', value: 0 }, { month: 'Aug', value: 0 }, { month: 'Sep', value: 0 },
                    { month: 'Oct', value: 0 }, { month: 'Nov', value: 0 }, { month: 'Dec', value: 0 },
                    { month: 'Jan', value: 0 }, { month: 'Feb', value: 0 }, { month: 'Mar', value: 0 }
                ],
                taxSummary: { domestic: 0, export: 0, totalGst: 0, taxableDomestic: 0, taxableExport: 0 },
                topProducts: [],
                domesticExportSplit: { domesticCount: 0, exportCount: 0 }
            };

            const accountMap = {};
            const productMap = {};

            this.savedDocs.forEach(doc => {
                const docDate = new Date(doc.date);

                // Grouping by type (always show current type) - Actually filtered by FY below? 
                // UX Requirement: "filter all sales-related data strictly between the FY start and end dates"
                if (docDate < fyStartDate || docDate > fyEndDate) return;

                const totals = this.getDocTotals(doc);
                const isInvoice = (doc.type === 'Tax Invoice' || doc.type === 'Debit Note');
                const isCreditNote = (doc.type === 'Credit Note');
                const multiplier = isCreditNote ? -1 : 1;
                const exRate = doc.exchangeRate || 1;

                if (isInvoice || isCreditNote) {
                    const taxableVal = totals.subtotal * multiplier * exRate;
                    const totalVal = totals.total * multiplier * exRate;
                    const gstVal = totals.tax * multiplier * exRate;

                    newStats.annualRevenue += taxableVal;

                    if (docDate.getMonth() === currentMonth && docDate.getFullYear() === currentYear) {
                        newStats.monthlyRevenue += taxableVal;
                    }

                    if (doc.status !== 'PAID') {
                        newStats.outstanding += totalVal;
                    } else {
                        newStats.collected += totalVal;
                    }

                    // Month-wise Trend
                    const monthIdx = docDate.getMonth();
                    // Map Jan(0) to index 9, Apr(3) to index 0
                    const trendIdx = (monthIdx >= 3) ? (monthIdx - 3) : (monthIdx + 9);
                    newStats.monthWiseTrend[trendIdx].value += taxableVal;

                    // Tax Summary & Sales Split
                    const isExport = doc.supplyType === 'EXPORT_LUT' || (doc.account.country && doc.account.country !== 'India');
                    if (isExport) {
                        newStats.taxSummary.taxableExport += taxableVal;
                        newStats.taxSummary.export += totalVal;
                        newStats.domesticExportSplit.exportCount++;
                    } else {
                        newStats.taxSummary.taxableDomestic += taxableVal;
                        newStats.taxSummary.domestic += totalVal;
                        newStats.taxSummary.totalGst += gstVal;
                        newStats.domesticExportSplit.domesticCount++;
                    }

                    // Top Accounts
                    const cName = doc.account.name || 'Unknown';
                    accountMap[cName] = (accountMap[cName] || 0) + taxableVal;

                    // Top Products
                    (doc.items || []).forEach(item => {
                        const amount = (Number(item.qty) * Number(item.rate)) * exRate;
                        const pName = item.desc || 'Unknown Product';
                        productMap[pName] = (productMap[pName] || 0) + amount;
                    });
                }

                if (doc.type === 'Quotation') newStats.conversion.quotes++;
                if (doc.type === 'Tax Invoice') newStats.conversion.invoices++;

                if (!newStats.docsByType[doc.type]) newStats.docsByType[doc.type] = [];

                let displayStatus = doc.status || 'UNPAID';
                if ((doc.type === 'Tax Invoice' || doc.type === 'Purchase Invoice') && displayStatus !== 'PAID' && doc.dueDate) {
                    if (new Date(doc.dueDate) < now) displayStatus = 'OVERDUE';
                }
                if (doc.type === 'Quotation' && doc.validityDate) {
                    if (new Date(doc.validityDate) < now) displayStatus = 'EXPIRED';
                }

                newStats.docsByType[doc.type].push({
                    id: doc.id,
                    number: doc.number,
                    account: doc.account.name || 'Unknown',
                    date: doc.date,
                    total: totals.total,
                    status: displayStatus,
                    raw: doc
                });
            });

            // Add Opening Balance to Outstanding
            if (this.openingBalance && this.openingBalance.outstanding) {
                newStats.outstanding += parseFloat(this.openingBalance.outstanding || 0);
            }

            newStats.topAccounts = Object.entries(accountMap)
                .map(([name, value]) => ({ name, value }))
                .sort((a, b) => b.value - a.value).slice(0, 5);

            newStats.topProducts = Object.entries(productMap)
                .map(([name, value]) => ({ name, value }))
                .sort((a, b) => b.value - a.value).slice(0, 5);

            if (newStats.conversion.quotes > 0) {
                newStats.conversion.rate = (newStats.conversion.invoices / newStats.conversion.quotes) * 100;
            }

            this.dashboardStats = newStats;
            const types = Object.keys(newStats.docsByType);
            if (types.length > 0 && !types.includes(this.dashboardStats.activeTab)) {
                this.dashboardStats.activeTab = types[0];
            }
            this.$nextTick(() => lucide.createIcons());
        },

        loadDashboard() {
            this.updateExecutiveStats();
        },

        openLedger(type) {
            this.dashboardStats.activeTab = type;
            this.loadDashboard();
            this.showLedger = true;
        },

        loadDocForView(id) {
            const doc = this.savedDocs.find(d => d.id === id);
            if (doc) {
                this.viewDoc = JSON.parse(JSON.stringify(doc));

                // Calculate Tax Breakdown
                const state = (this.viewDoc.account.state || '').toLowerCase();
                const isInterstate = !state.includes('telangana');
                const totalTax = this.viewDoc.totals?.tax || 0;

                if (isInterstate) {
                    this.viewDoc.totals.igst = totalTax;
                    this.viewDoc.totals.cgst = 0;
                    this.viewDoc.totals.sgst = 0;
                } else {
                    this.viewDoc.totals.igst = 0;
                    this.viewDoc.totals.cgst = totalTax / 2;
                    this.viewDoc.totals.sgst = totalTax / 2;
                }

                this.showDocViewer = true;
            }
        },

        reviseDoc(id) {
            const doc = this.savedDocs.find(d => d.id === id);
            if (doc) {
                // Load doc as base
                this.doc = JSON.parse(JSON.stringify(doc));

                // Add revision logic
                const originalNo = this.doc.number;
                // Check if already a revision
                const revMatch = originalNo.match(/-Rev(\d+)$/);
                let newRev = 1;
                let baseNo = originalNo;

                if (revMatch) {
                    newRev = parseInt(revMatch[1]) + 1;
                    baseNo = originalNo.replace(/-Rev\d+$/, '');
                }

                this.doc.number = `${baseNo}-Rev${newRev}`;
                this.doc.date = new Date().toISOString().split('T')[0]; // Reset date to today
                delete this.doc.id; // Ensure new ID on save

                this.showDashboard = false;
                window.scrollTo({ top: 0, behavior: 'smooth' });
                this.notify('Document loaded for revision', 'info');
            }
        },

        getFilteredDocs(type) {
            const docs = this.dashboardStats.docsByType[type] || [];
            if (!this.ledgerControls.search && !this.ledgerControls.startDate && !this.ledgerControls.endDate && this.ledgerControls.currency === 'All') {
                return docs;
            }

            return docs.filter(doc => {
                // Search Filter
                const searchLower = this.ledgerControls.search.toLowerCase();
                const matchesSearch = !this.ledgerControls.search ||
                    doc.number.toLowerCase().includes(searchLower) ||
                    doc.account.toLowerCase().includes(searchLower) ||
                    doc.total.toString().includes(searchLower);

                // Date Range Filter
                let matchesDate = true;
                if (this.ledgerControls.startDate) {
                    matchesDate = matchesDate && new Date(doc.date) >= new Date(this.ledgerControls.startDate);
                }
                if (this.ledgerControls.endDate) {
                    matchesDate = matchesDate && new Date(doc.date) <= new Date(this.ledgerControls.endDate);
                }

                // Currency Filter
                let matchesCurrency = true;
                if (this.ledgerControls.currency !== 'All') {
                    matchesCurrency = doc.raw.currency === this.ledgerControls.currency;
                }

                return matchesSearch && matchesDate && matchesCurrency;
            });
        },

        exportLedgerTab(type) {
            const data = this.getFilteredDocs(type).map(doc => ({
                'Date': doc.date,
                'Document No': doc.number,
                'Account': doc.account,
                'Status': doc.status,
                'Amount': doc.total
            }));

            if (data.length === 0) {
                this.notify('No data to export!', 'warning');
                return;
            }

            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Ledger");
            XLSX.writeFile(wb, `${type}_Ledger_Export.xlsx`);
            this.notify('Ledger exported successfully!', 'success');
        },

        getGstr1Details() {
            const docs = this.savedDocs.filter(d =>
                d.type === 'Tax Invoice' ||
                d.type === 'Credit Note' ||
                d.type === 'Debit Note'
            );

            const b2b = [];
            const b2cMap = {}; // Key: POS-Rate

            docs.forEach(doc => {
                const multiplier = doc.type === 'Credit Note' ? -1 : 1;
                const isB2B = this.isB2B(doc.account);
                const pos = isB2B ? doc.account.gstin.substring(0, 2) : (this.getGstStateCode(doc.account.gstin) || this.doc.company.gstin.substring(0, 2));

                if (isB2B) {
                    // Group invoice items by rate for B2B
                    const rateGroups = {};
                    doc.items.forEach(item => {
                        const r = Number(item.taxRate || 18);
                        if (!rateGroups[r]) rateGroups[r] = { rt: r, txval: 0, iamt: 0, camt: 0, samt: 0 };
                        const txval = (item.qty * item.rate) * multiplier;
                        const tax = txval * (r / 100);
                        rateGroups[r].txval += txval;
                        if (this.isIGST(doc.account.gstin)) rateGroups[r].iamt += tax;
                        else {
                            rateGroups[r].camt += tax / 2;
                            rateGroups[r].samt += tax / 2;
                        }
                    });

                    const docStats = this.getDocTotals(doc);
                    const itms = Object.values(rateGroups);
                    const docIamt = itms.reduce((sum, itm) => sum + (itm.iamt || 0), 0);
                    const docCamt = itms.reduce((sum, itm) => sum + (itm.camt || 0), 0);
                    const docSamt = itms.reduce((sum, itm) => sum + (itm.samt || 0), 0);

                    b2b.push({
                        number: doc.number,
                        date: doc.date,
                        poNumber: doc.poNumber || '',
                        poDate: doc.poDate || '',
                        name: doc.account.name,
                        gstin: doc.account.gstin,
                        pos: pos,
                        itms: itms,
                        taxable: docStats.subtotal * multiplier,
                        gst: docStats.tax * multiplier,
                        iamt: docIamt,
                        camt: docCamt,
                        samt: docSamt
                    });
                } else {
                    // Aggregate B2C by POS and Rate
                    doc.items.forEach(item => {
                        const r = Number(item.taxRate || 18);
                        const key = `${pos}-${r}`;
                        if (!b2cMap[key]) b2cMap[key] = { pos, rt: r, txval: 0, iamt: 0, camt: 0, samt: 0 };
                        const txval = (item.qty * item.rate) * multiplier;
                        const tax = txval * (r / 100);
                        b2cMap[key].txval += txval;
                        if (pos !== this.doc.company.gstin.substring(0, 2)) b2cMap[key].iamt += tax;
                        else {
                            b2cMap[key].camt += tax / 2;
                            b2cMap[key].samt += tax / 2;
                        }
                    });
                }
            });

            return { b2b, b2c: Object.values(b2cMap) };
        },

        exportGstr1Details() {
            const data = this.getGstr1Details();
            let csv = "Type,Invoice No,Date,Account PO No,Account PO Date,Account Name,GSTIN,Taxable Value,GST Total\n";

            data.b2b.forEach(item => {
                csv += `B2B,${item.number},${item.date},${item.poNumber},${item.poDate},"${item.name}",${item.gstin},${item.taxable},${item.gst}\n`;
            });

            data.b2c.forEach(item => {
                csv += `B2C,${item.number},${item.date},,, "${item.name}",,${item.taxable},${item.gst}\n`;
            });

            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('hidden', '');
            a.setAttribute('href', url);
            a.setAttribute('download', `GSTR1_Details_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            this.notify('GSTR-1 details exported to CSV', 'success');
        },

        generateGstr1Json() {
            const details = this.getGstr1Details();
            const hsnSummary = this.getHsnSummary();
            const now = new Date();
            const period = (now.getMonth() + 1).toString().padStart(2, '0') + now.getFullYear();

            const json = {
                gstin: this.doc.company.gstin,
                fp: period,
                cur_gt: 0,
                b2b: details.b2b.map(inv => ({
                    ctin: inv.gstin,
                    inv: [{
                        inum: inv.number,
                        idt: this.formatDate(inv.date),
                        val: inv.taxable + inv.gst,
                        pos: inv.pos,
                        rchrg: "N",
                        inv_typ: "R",
                        itms: inv.itms.map((itm, i) => ({
                            num: i + 1,
                            itm_det: {
                                rt: itm.rt,
                                txval: itm.txval,
                                iamt: itm.iamt,
                                camt: itm.camt,
                                samt: itm.samt,
                                csamt: 0
                            }
                        }))
                    }]
                })),
                b2cs: details.b2c.map(group => ({
                    sply_ty: group.pos === this.doc.company.gstin.substring(0, 2) ? "INTRA" : "INTER",
                    pos: group.pos,
                    typ: "OE",
                    rt: group.rt,
                    txval: group.txval,
                    iamt: group.iamt,
                    camt: group.camt,
                    samt: group.samt,
                    csamt: 0
                })),
                hsn: {
                    data: hsnSummary.map((h, i) => ({
                        num: i + 1,
                        hsn_sc: h.hsn,
                        desc: h.desc,
                        uqc: "NOS",
                        qty: h.qty,
                        val: h.total,
                        txval: h.taxable,
                        iamt: h.iamt,
                        camt: h.camt,
                        samt: h.samt,
                        csamt: 0
                    }))
                }
            };

            const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('href', url);
            a.setAttribute('download', `GSTR1_${this.doc.company.gstin}_${period}.json`);
            a.click();
            this.notify('GSTR-1 JSON generated and downloaded', 'success');
        },

        generateGstr3bJson() {
            const period = new Date().toISOString().slice(0, 7).replace('-', '');
            const portalData = this.getGstr3bPortalData();

            const json = {
                gstin: this.doc.company.gstin,
                fp: period,
                ret_period: period,
                table3_1: {
                    sup_details: {
                        osup_det: {
                            txval: portalData.table31.a.val,
                            iamt: portalData.table31.a.tax,
                            camt: portalData.table31.a.tax / 2,
                            samt: portalData.table31.a.tax / 2,
                            csamt: 0
                        },
                        osup_zero: { txval: 0, iamt: 0, camt: 0, samt: 0, csamt: 0 },
                        osup_nil_exmp: { txval: 0, iamt: 0, camt: 0, samt: 0, csamt: 0 },
                        isup_rev: { txval: 0, iamt: 0, camt: 0, samt: 0, csamt: 0 },
                        osup_nongst: { txval: 0, iamt: 0, camt: 0, samt: 0, csamt: 0 }
                    }
                },
                table4: {
                    itc_avail: [
                        { ty: "IMPG", iamt: 0, camt: 0, samt: 0, csamt: 0 },
                        { ty: "IMPS", iamt: 0, camt: 0, samt: 0, csamt: 0 },
                        { ty: "ISUP", iamt: 0, camt: 0, samt: 0, csamt: 0 },
                        { ty: "ISD", iamt: 0, camt: 0, samt: 0, csamt: 0 },
                        { ty: "OTH", iamt: 0, camt: 0, samt: 0, csamt: 0 }
                    ],
                    itc_rev: [
                        { ty: "RULE", iamt: 0, camt: 0, samt: 0, csamt: 0 },
                        { ty: "OTH", iamt: 0, camt: 0, samt: 0, csamt: 0 }
                    ],
                    itc_inelg: [
                        { ty: "RULE", iamt: 0, camt: 0, samt: 0, csamt: 0 },
                        { ty: "OTH", iamt: 0, camt: 0, samt: 0, csamt: 0 }
                    ]
                }
            };

            const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('href', url);
            a.setAttribute('download', `GSTR3B_${this.doc.company.gstin}_${period}.json`);
            a.click();
            this.notify('GSTR-3B JSON generated and downloaded', 'success');
        },

        exportGstr1Excel() {
            const period = new Date().toISOString().slice(0, 7);
            const details = this.getGstr1Details();
            const hsn = this.getHsnSummary();

            // Prepare B2B Sheet (Expanding items)
            const b2bData = [];
            details.b2b.forEach(inv => {
                inv.itms.forEach(itm => {
                    b2bData.push({
                        "Invoice Number": inv.number,
                        "Invoice Date": inv.date,
                        "Account PO No": inv.poNumber || '',
                        "Account PO Date": inv.poDate || '',
                        "Account Name": inv.name,
                        "Account GSTIN": inv.gstin,
                        "Place of Supply": inv.pos,
                        "Rate": itm.rt,
                        "Taxable Value": itm.txval,
                        "IGST": itm.iamt,
                        "CGST": itm.camt,
                        "SGST": itm.samt
                    });
                });
            });

            // Prepare B2CS Sheet (Aggregated)
            const b2csData = details.b2c.map(group => ({
                "Place of Supply": group.pos,
                "Type": group.pos === this.doc.company.gstin.substring(0, 2) ? "Intra-State" : "Inter-State",
                "Rate": group.rt,
                "Taxable Value": group.txval,
                "IGST": group.iamt,
                "CGST": group.camt,
                "SGST": group.samt
            }));

            // Prepare HSN Sheet
            const hsnData = hsn.map(h => ({
                "HSN/SAC": h.hsn,
                "Description": h.desc,
                "UQC": "NOS",
                "Total Quantity": h.qty,
                "Taxable Value": h.taxable,
                "IGST": h.iamt,
                "CGST": h.camt,
                "SGST": h.samt,
                "Total Value": h.total
            }));

            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(b2bData), "B2B");
            XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(b2csData), "B2CS");
            XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(hsnData), "HSN");

            XLSX.writeFile(wb, `GSTR1_${this.doc.company.gstin}_${period}.xlsx`);
            this.notify('GSTR-1 Excel generated and downloaded', 'success');
        },

        exportGstr3bExcel() {
            const period = new Date().toISOString().slice(0, 7);
            const portalData = this.getGstr3bPortalData();

            const table31 = [
                { "Nature of Supplies": portalData.table31.a.label, "Taxable Value": portalData.table31.a.val, "IGST": portalData.table31.a.tax, "CGST": portalData.table31.a.tax / 2, "SGST": portalData.table31.a.tax / 2 },
                { "Nature of Supplies": portalData.table31.b.label, "Taxable Value": 0, "IGST": 0, "CGST": 0, "SGST": 0 },
                { "Nature of Supplies": portalData.table31.c.label, "Taxable Value": 0, "IGST": 0, "CGST": 0, "SGST": 0 },
                { "Nature of Supplies": portalData.table31.d.label, "Taxable Value": 0, "IGST": 0, "CGST": 0, "SGST": 0 },
                { "Nature of Supplies": portalData.table31.e.label, "Taxable Value": 0, "IGST": 0, "CGST": 0, "SGST": 0 }
            ];

            const table4 = [
                { "Details": portalData.table4.a.label, "Total ITC": 0 },
                { "Details": portalData.table4.b.label, "Total ITC": 0 },
                { "Details": portalData.table4.c.label, "Total ITC": 0 },
                { "Details": portalData.table4.d.label, "Total ITC": 0 }
            ];

            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(table31), "Table 3.1");
            XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(table4), "Table 4");

            XLSX.writeFile(wb, `GSTR3B_${this.doc.company.gstin}_${period}.xlsx`);
            this.notify('GSTR-3B Excel generated and downloaded', 'success');
        },

        getHsnSummary() {
            const hsnMap = {};
            const docs = this.savedDocs.filter(d =>
                d.type === 'Tax Invoice' || d.type === 'Credit Note' || d.type === 'Debit Note'
            );

            docs.forEach(doc => {
                const isCreditNote = doc.type === 'Credit Note';
                const multiplier = isCreditNote ? -1 : 1;
                const isIGST = this.isIGST(doc);

                doc.items.forEach(item => {
                    if (!item.hsn) return;
                    if (!hsnMap[item.hsn]) {
                        hsnMap[item.hsn] = { hsn: item.hsn, desc: item.desc, qty: 0, taxable: 0, total: 0, iamt: 0, camt: 0, samt: 0 };
                    }
                    const taxable = (item.qty * item.rate) * multiplier;
                    const tax = (taxable * (item.taxRate / 100));

                    hsnMap[item.hsn].qty += (item.qty * multiplier);
                    hsnMap[item.hsn].taxable += taxable;
                    hsnMap[item.hsn].total += (taxable + tax);

                    if (isIGST) hsnMap[item.hsn].iamt += tax;
                    else {
                        hsnMap[item.hsn].camt += tax / 2;
                        hsnMap[item.hsn].samt += tax / 2;
                    }
                });
            });

            return Object.values(hsnMap);
        },

        getHsnMonthlySummary(fiscalYear) {
            if (!fiscalYear) fiscalYear = this.selectedFY;
            if (!fiscalYear) return { months: [], hsnSummary: [], monthlyTotals: [], grandTotal: {} };

            const years = fiscalYear.split('-');
            const startYear = parseInt(years[0]);
            const endYear = startYear + 1;

            const startDate = `${startYear}-04-01`;
            const endDate = `${endYear}-03-31`;

            const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
            const hsnMap = {};
            const monthlyTotals = months.map(() => ({ taxable: 0, igst: 0, cgst: 0, sgst: 0 }));

            const docs = this.savedDocs.filter(d =>
                (d.type === 'Tax Invoice' || d.type === 'Credit Note' || d.type === 'Debit Note') &&
                d.date >= startDate &&
                d.date <= endDate
            );


            docs.forEach(doc => {
                const docDate = new Date(doc.date);
                let monthIdx = docDate.getMonth() - 3; // Apr is 3, index 0
                if (monthIdx < 0) monthIdx += 12;

                const multiplier = doc.type === 'Credit Note' ? -1 : 1;
                const exRate = Number(doc.exchangeRate || 1);
                const isIGST = this.isIGST(doc);

                // Determine if this is an export invoice
                const isExport = doc.supplyType === 'EXPORT_LUT' || doc.supplyType === 'EXPORT_WPAY' ||
                    (doc.account && doc.account.country && doc.account.country !== 'India');

                // Track which HSNs are in this invoice to count invoice only once per HSN
                const hsnInThisDoc = new Set();

                doc.items.forEach(item => {
                    const hsn = item.hsn || '999999';
                    // Create composite key: HSN-EXPORT or HSN-DOMESTIC
                    const hsnKey = isExport ? `${hsn}-EXPORT` : `${hsn}-DOMESTIC`;

                    if (!hsnMap[hsnKey]) {
                        hsnMap[hsnKey] = {
                            code: hsn,
                            type: isExport ? 'Export' : 'Domestic',
                            months: months.map(() => ({ count: 0, taxable: 0, igst: 0, cgst: 0, sgst: 0 })),
                            total: { count: 0, taxable: 0, igst: 0, cgst: 0, sgst: 0 }
                        };
                    }

                    const taxable = (item.qty * item.rate) * multiplier * exRate;
                    // For exports under LUT, tax is 0. For exports with payment, use item.taxRate
                    const isLutExport = doc.supplyType === 'EXPORT_LUT';
                    const tax = isLutExport ? 0 : (taxable * (item.taxRate / 100));

                    const mData = hsnMap[hsnKey].months[monthIdx];

                    // Count invoice only once per HSN (even if multiple line items with same HSN)
                    if (!hsnInThisDoc.has(hsnKey)) {
                        mData.count += (1 * multiplier);
                        hsnMap[hsnKey].total.count += (1 * multiplier);
                        hsnInThisDoc.add(hsnKey);
                    }

                    // But aggregate all financial values
                    mData.taxable += taxable;

                    if (isIGST) mData.igst += tax;
                    else {
                        mData.cgst += tax / 2;
                        mData.sgst += tax / 2;
                    }

                    // Update HSN Total (financial values)
                    hsnMap[hsnKey].total.taxable += taxable;
                    if (isIGST) hsnMap[hsnKey].total.igst += tax;
                    else {
                        hsnMap[hsnKey].total.cgst += tax / 2;
                        hsnMap[hsnKey].total.sgst += tax / 2;
                    }

                    // Update Monthly Grand Totals
                    monthlyTotals[monthIdx].taxable += taxable;
                    if (isIGST) monthlyTotals[monthIdx].igst += tax;
                    else {
                        monthlyTotals[monthIdx].cgst += tax / 2;
                        monthlyTotals[monthIdx].sgst += tax / 2;
                    }
                });
            });



            return {
                months,
                hsnSummary: Object.values(hsnMap).sort((a, b) => a.code.localeCompare(b.code)),
                monthlyTotals,
                grandTotal: monthlyTotals.reduce((acc, curr) => ({
                    taxable: acc.taxable + curr.taxable,
                    igst: acc.igst + curr.igst,
                    cgst: acc.cgst + curr.cgst,
                    sgst: acc.sgst + curr.sgst
                }), { taxable: 0, igst: 0, cgst: 0, sgst: 0 })
            };
        },

        exportHsnSummaryExcel(fiscalYear) {
            const data = this.getHsnMonthlySummary(fiscalYear);
            const workbook = XLSX.utils.book_new();

            // 1. Summary Sheet (HSN vs Months Count)
            const summaryRows = data.hsnSummary.map(h => {
                const row = {
                    "HSN Code": h.code,
                    "Type": h.type
                };
                data.months.forEach((m, i) => {
                    row[m] = h.months[i].count;
                });
                row["Total"] = h.total.count;
                return row;
            });

            // Add Grand Total row for summary
            const summaryTotal = { "HSN Code": "Total" };
            data.months.forEach((m, i) => {
                summaryTotal[m] = data.hsnSummary.reduce((sum, h) => sum + h.months[i].count, 0);
            });
            summaryTotal["Total"] = data.hsnSummary.reduce((sum, h) => sum + h.total.count, 0);
            summaryRows.push(summaryTotal);

            const wsSummary = XLSX.utils.json_to_sheet(summaryRows);
            XLSX.utils.book_append_sheet(workbook, wsSummary, "Count Summary");

            // 2. Detailed Sheet (Matching User Screenshot Layout)
            const detailedRows = [];

            data.hsnSummary.forEach(h => {
                // Header row for HSN with counts
                const headerRow = {
                    "HSN Code": `${h.code} (${h.type})`
                };
                data.months.forEach((m, i) => {
                    headerRow[m] = h.months[i].count;
                });
                headerRow["Total"] = h.total.count;
                detailedRows.push(headerRow);

                // Taxable Value row
                const taxableRow = { "HSN Code": "Taxable" };
                data.months.forEach((m, i) => {
                    taxableRow[m] = h.months[i].taxable;
                });
                taxableRow["Total"] = h.total.taxable;
                detailedRows.push(taxableRow);

                // IGST row
                const igstRow = { "HSN Code": "IGST" };
                data.months.forEach((m, i) => {
                    igstRow[m] = h.months[i].igst;
                });
                igstRow["Total"] = h.total.igst;
                detailedRows.push(igstRow);

                // CGST row
                const cgstRow = { "HSN Code": "CGST" };
                data.months.forEach((m, i) => {
                    cgstRow[m] = h.months[i].cgst;
                });
                cgstRow["Total"] = h.total.cgst;
                detailedRows.push(cgstRow);

                // SGST row
                const sgstRow = { "HSN Code": "SGST" };
                data.months.forEach((m, i) => {
                    sgstRow[m] = h.months[i].sgst;
                });
                sgstRow["Total"] = h.total.sgst;
                detailedRows.push(sgstRow);

                detailedRows.push({}); // Spacer row
            });

            // Grand Totals at bottom
            const totalTaxableRow = { "HSN Code": "Total Taxable" };
            const totalIgstRow = { "HSN Code": "Total IGST" };
            const totalCgstRow = { "HSN Code": "Total CGST" };
            const totalSgstRow = { "HSN Code": "Total SGST" };

            data.months.forEach((m, i) => {
                totalTaxableRow[m] = data.monthlyTotals[i].taxable;
                totalIgstRow[m] = data.monthlyTotals[i].igst;
                totalCgstRow[m] = data.monthlyTotals[i].cgst;
                totalSgstRow[m] = data.monthlyTotals[i].sgst;
            });

            totalTaxableRow["Total"] = data.grandTotal.taxable;
            totalIgstRow["Total"] = data.grandTotal.igst;
            totalCgstRow["Total"] = data.grandTotal.cgst;
            totalSgstRow["Total"] = data.grandTotal.sgst;

            detailedRows.push(totalTaxableRow);
            detailedRows.push(totalIgstRow);
            detailedRows.push(totalCgstRow);
            detailedRows.push(totalSgstRow);

            const wsDetailed = XLSX.utils.json_to_sheet(detailedRows);
            XLSX.utils.book_append_sheet(workbook, wsDetailed, "HSN Financial Summary");

            XLSX.writeFile(workbook, `HSN_Full_Summary_${fiscalYear || this.selectedFY}.xlsx`);
            this.notify('Detailed HSN Summary exported to Excel', 'success');
        },

        isIGST(doc) {
            // New compliance logic
            const target = doc?.account || doc || this.doc.account;

            // For Purchase Invoices from international vendors, it's always IGST (paid to customs)
            if (this.doc.type === 'Purchase Invoice' && target.country && target.country !== 'India') {
                return true;
            }

            if (target.country && target.country !== 'India') return true; // Exports are IGST

            const targetGstin = target.gstin || '';
            if (!targetGstin || !this.doc.company.gstin) {
                // For B2C, check state
                const supplierState = (this.gstSettings.state || '').toLowerCase();
                const customerState = (target.state || '').toLowerCase();
                if (customerState && supplierState && supplierState !== customerState) return true;
                return false;
            }

            return targetGstin.substring(0, 2) !== this.doc.company.gstin.substring(0, 2);
        },

        getGstr3bPortalData() {
            const stats = this.getGstDashboardStats();

            // Aggregate ITC from Purchase Invoices
            let itc = { available: 0, import: 0, rcm: 0, ineligible: 0 };

            this.savedDocs.forEach(doc => {
                if (doc.type !== 'Purchase Invoice') return;
                const totals = this.getDocTotals(doc);
                const exRate = doc.exchangeRate || 1;
                const tax = totals.tax * exRate;

                if (doc.account && doc.account.country && doc.account.country !== 'India') {
                    itc.import += tax;
                } else if (doc.isRcm) {
                    itc.rcm += tax;
                } else if (doc.itcEligibility === 'Ineligible') {
                    itc.ineligible += tax;
                } else {
                    itc.available += tax;
                }
            });

            return {
                table31: {
                    a: { label: "Outward Taxable Supplies", val: stats.totalTaxable, tax: stats.totalGst },
                    b: { label: "Outward Taxable Supplies (Zero Rated)", val: 0, tax: 0 },
                    c: { label: "Other Outward Supplies (Nil Rated, Exempted)", val: 0, tax: 0 },
                    d: { label: "Inward Supplies liable to Reverse Charge", val: itc.rcm, tax: itc.rcm },
                    e: { label: "Non-GST Outward Supplies", val: 0, tax: 0 }
                },
                table4: {
                    a: { label: "ITC Available (Import, RCM, etc.)", val: itc.available + itc.import + itc.rcm },
                    b: { label: "ITC Reversed", val: 0 },
                    c: { label: "Net ITC Available", val: itc.available + itc.import + itc.rcm },
                    d: { label: "Ineligible ITC", val: itc.ineligible }
                }
            };
        },

        async saveGstReturn(type, status) {
            const payload = {
                type: type,
                period: new Date().toISOString().slice(0, 7), // YYYY-MM
                status: status || 'DRAFT',
                data: type === 'GSTR-1' ? { details: this.getGstr1Details(), hsn: this.getHsnSummary() } : this.getGstr3bPortalData(),
                filed_at: status === 'FILED' ? new Date() : null,
                created_by: this.user?.id
            };
            const { error } = await window.supabase.from('gst_returns').upsert(payload);
            if (!error) {
                this.notify(`${type} saved to persistent registry`, 'success');
                await this.loadGstReturns();
            } else {
                console.error('GST Save Error:', error);
                this.notify('Failed to save GST return: ' + error.message, 'error');
            }
        },

        async saveDocToHistory() {
            if (!this.doc.account.name) {
                this.notify('Account Name is required to save draft', 'warning');
                return;
            }

            // For Drafts, we don't assign a permanent serial number if it's a Tax Invoice
            let draftNumber = this.doc.number;
            if (!draftNumber || draftNumber.includes('PREVIEW')) {
                const prefix = this.getDocPrefix(this.doc.type);
                draftNumber = `${prefix}-DRAFT-${Date.now()}`;
            }

            try {
                const payload = {
                    ...this.doc,
                    number: draftNumber,
                    status: 'DRAFT',
                    isPosted: false,
                    updated_at: new Date().toISOString()
                };

                const { error } = await window.supabase.from('documents').upsert(payload);
                if (error) throw error;

                this.doc.number = draftNumber;
                this.notify('Draft saved to history', 'success');
                await this.loadHistory();
            } catch (err) {
                this.notify('Failed to save history: ' + err.message, 'error');
            }
        },

        async loadGstReturns() {
            const { data, error } = await window.supabase
                .from('gst_returns')
                .select('*')
                .order('created_at', { ascending: false });
            if (!error) this.gstHistory = data;
        },

        viewGstReturnDetail(rec) {
            this.selectedGstReturn = rec;
            this.showGstHistoryDetail = true;
        },

        // --- GST Compliance Helper Functions ---

        getApplicableReturns() {
            return this.gstReturnTypes.filter(rt =>
                rt.applicableTo.includes(this.gstSettings.taxpayerType)
            );
        },

        isValidGstin(gstin) {
            const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
            return regex.test(gstin);
        },

        isValidHsn(hsn) {
            const regex = /^\d{4}(\d{2})?(\d{2})?$/;
            return regex.test(hsn);
        },

        calculateGstDueDate(returnType, period, frequency) {
            const rt = this.gstReturnTypes.find(r => r.code === returnType);
            if (!rt) return null;

            let dueDate;

            if (frequency === 'Monthly') {
                // Period format: '2026-01'
                const [year, month] = period.split('-').map(Number);
                const nextMonth = month === 12 ? 1 : month + 1;
                const nextYear = month === 12 ? year + 1 : year;
                dueDate = new Date(nextYear, nextMonth - 1, rt.dueDayMonthly);
            } else if (frequency === 'Quarterly') {
                // Period format: 'Q1-2026'
                const [q, year] = period.split('-');
                const quarter = q.replace('Q', '');
                const quarterEndMonth = quarter * 3;
                const nextMonth = quarterEndMonth === 12 ? 1 : quarterEndMonth + 1;
                const nextYear = quarterEndMonth === 12 ? parseInt(year) + 1 : parseInt(year);

                let dueDay = rt.dueDayQuarterly;
                if (typeof dueDay === 'object') {
                    dueDay = dueDay[q] || 13;
                }

                dueDate = new Date(nextYear, nextMonth - 1, dueDay);
            } else if (frequency === 'Annual') {
                // Period format: 'FY2025-26'
                const fyYear = parseInt(period.split('-')[0].replace('FY', ''));
                dueDate = new Date(fyYear + 1, rt.dueDateAnnual.month - 1, rt.dueDateAnnual.day);
            }

            return dueDate;
        },

        getGstPeriods(year, frequency) {
            const periods = [];
            if (frequency === 'Monthly') {
                for (let m = 1; m <= 12; m++) {
                    const month = m.toString().padStart(2, '0');
                    periods.push({ value: `${year}-${month}`, label: `${this.getMonthName(m)} ${year}` });
                }
            } else if (frequency === 'Quarterly') {
                for (let q = 1; q <= 4; q++) {
                    periods.push({ value: `Q${q}-${year}`, label: `Q${q} ${year}` });
                }
            } else if (frequency === 'Annual') {
                const fy = `FY${year}-${(year + 1).toString().slice(-2)}`;
                periods.push({ value: fy, label: fy });
            }
            return periods;
        },

        getMonthName(month) {
            const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return names[month - 1];
        },

        async calculateGSTR1(startDate, endDate) {
            // Calculate GSTR-1 from Tax Invoices, Credit Notes, and Debit Notes for the given period
            const docs = this.savedDocs.filter(d =>
                (d.type === 'Tax Invoice' || d.type === 'Credit Note' || d.type === 'Debit Note') &&
                d.date >= startDate &&
                d.date <= endDate
            );

            const b2b = [];
            const b2cl = []; // B2C Large: Unregistered + Inter-state + Value > 2.5L
            const b2csMap = {}; // B2C Small: Aggregated by POS and Rate
            const exports = []; // Table 6A: Exports under LUT
            const hsnMap = {}; // Key: HSN-Rate
            let totalTaxable = 0;
            let totalGst = 0;

            docs.forEach(doc => {
                const multiplier = doc.type === 'Credit Note' ? -1 : 1;
                const isB2B = this.isB2B(doc.account);
                const isExport = (doc.currency && doc.currency !== 'INR') || (doc.account && doc.account.country && doc.account.country !== 'India');
                const pos = isB2B ? doc.account.gstin.substring(0, 2) : (this.getGstStateCode(doc.account.gstin) || this.doc.company.gstin.substring(0, 2));
                const isInterstate = pos !== this.doc.company.gstin.substring(0, 2);

                const totals = this.getDocTotals(doc);
                const exRate = doc.exchangeRate || 1;
                const docTaxable = totals.subtotal * multiplier * exRate;
                const docGst = totals.tax * multiplier * exRate;

                // Aggregate HSN Summary (Section 12)
                doc.items.forEach(item => {
                    const hsn = item.hsn || '999999';
                    const r = Number(item.taxRate || 18);

                    // Determine HSN Group Type: INTRA, INTER, or EXPORT
                    let hsnLocation = 'INTRA';
                    if (isExport) hsnLocation = 'EXPORT';
                    else if (isInterstate) hsnLocation = 'INTER';

                    // Key includes location to separate IGST from CGST/SGST rows for same HSN
                    const hsnKey = `${hsn}-${r}-${hsnLocation}`;

                    if (!hsnMap[hsnKey]) {
                        hsnMap[hsnKey] = { hsn, uqc: 'NOS', qty: 0, txval: 0, iamt: 0, camt: 0, samt: 0, rt: r, type: hsnLocation };
                    }

                    const itemTxval = (item.qty * item.rate) * multiplier * exRate;
                    const itemTax = itemTxval * (r / 100);

                    hsnMap[hsnKey].qty += (item.qty * multiplier);
                    hsnMap[hsnKey].txval += itemTxval;

                    if (isExport) {
                        if (doc.supplyType === 'EXPORT_LUT') {
                            // LUT: Add Taxable Value, but 0 GST
                            hsnMap[hsnKey].iamt += 0;
                        } else {
                            // Export with Payment: Add IGST
                            hsnMap[hsnKey].iamt += itemTax;
                        }
                    } else if (isInterstate) {
                        hsnMap[hsnKey].iamt += itemTax;
                    } else {
                        hsnMap[hsnKey].camt += itemTax / 2;
                        hsnMap[hsnKey].samt += itemTax / 2;
                    }
                });

                // Classification into Tables
                if (isExport) {
                    exports.push({
                        number: doc.number,
                        date: doc.date,
                        value: docTaxable,
                        type: 'EXPWP', // Export Without Payment (LUT)
                        shippingBill: doc.shippingBill || '',
                        shippingDate: doc.shippingDate || ''
                    });
                } else if (isB2B) {
                    const rateGroups = {};
                    doc.items.forEach(item => {
                        const r = Number(item.taxRate || 18);
                        if (!rateGroups[r]) rateGroups[r] = { rt: r, txval: 0, iamt: 0, camt: 0, samt: 0 };
                        const txval = (item.qty * item.rate) * multiplier * exRate;
                        const tax = txval * (r / 100);
                        rateGroups[r].txval += txval;
                        if (isInterstate) rateGroups[r].iamt += tax;
                        else {
                            rateGroups[r].camt += tax / 2;
                            rateGroups[r].samt += tax / 2;
                        }
                    });

                    const itms = Object.values(rateGroups);
                    const docIamt = itms.reduce((sum, itm) => sum + (itm.iamt || 0), 0);
                    const docCamt = itms.reduce((sum, itm) => sum + (itm.camt || 0), 0);
                    const docSamt = itms.reduce((sum, itm) => sum + (itm.samt || 0), 0);

                    b2b.push({
                        number: doc.number,
                        date: doc.date,
                        gstin: doc.account.gstin,
                        name: doc.account.name,
                        pos: pos,
                        poNumber: doc.poNumber || '',
                        poDate: doc.poDate || '',
                        taxable: docTaxable,
                        gst: docGst,
                        iamt: docIamt,
                        camt: docCamt,
                        samt: docSamt,
                        itms: itms
                    });
                } else if (isInterstate && docTaxable > 250000) {
                    // B2C Large (Table 5)
                    b2cl.push({
                        number: doc.number,
                        date: doc.date,
                        pos: pos,
                        taxable: docTaxable,
                        rt: doc.items[0]?.taxRate || 18,
                        gst: docGst
                    });
                } else {
                    // B2C Others (Table 7)
                    doc.items.forEach(item => {
                        const r = Number(item.taxRate || 18);
                        const key = `${pos}-${r}`;
                        if (!b2csMap[key]) b2csMap[key] = { pos, rt: r, txval: 0, iamt: 0, camt: 0, samt: 0 };
                        const txval = (item.qty * item.rate) * multiplier * exRate;
                        const tax = txval * (r / 100);
                        b2csMap[key].txval += txval;
                        if (isInterstate) b2csMap[key].iamt += tax;
                        else {
                            b2csMap[key].camt += tax / 2;
                            b2csMap[key].samt += tax / 2;
                        }
                    });
                }

                totalTaxable += docTaxable;
                totalGst += docGst;
            });

            return {
                b2b,
                b2cl,
                b2cs: Object.values(b2csMap),
                exports,
                hsnSummary: Object.values(hsnMap),
                totalTaxable,
                totalGst,
                iamt: b2b.reduce((s, i) => s + (i.itms.reduce((ss, ii) => ss + ii.iamt, 0)), 0) +
                    b2cl.reduce((s, i) => s + i.gst, 0) +
                    Object.values(b2csMap).reduce((s, i) => s + i.iamt, 0),
                camt: b2b.reduce((s, i) => s + (i.itms.reduce((ss, ii) => ss + ii.camt, 0)), 0) +
                    Object.values(b2csMap).reduce((s, i) => s + i.camt, 0),
                samt: b2b.reduce((s, i) => s + (i.itms.reduce((ss, ii) => ss + ii.samt, 0)), 0) +
                    Object.values(b2csMap).reduce((s, i) => s + i.samt, 0),
                invoiceCount: docs.length
            };
        },

        async calculateGSTR3B(startDate, endDate) {
            const gstr1Data = await this.calculateGSTR1(startDate, endDate);

            // Fetch Purchase Invoices for ITC
            const purchases = this.savedDocs.filter(d =>
                d.type === 'Purchase Invoice' &&
                d.date >= startDate &&
                d.date <= endDate
            ).map(d => d.raw || d);

            let itcTotal = 0;
            purchases.forEach(p => {
                p.items.forEach(item => {
                    const exRate = p.exchangeRate || 1;
                    const r = Number(item.taxRate || 18);
                    itcTotal += (item.qty * item.rate) * (r / 100) * exRate;
                });
            });

            const exportValue = gstr1Data.exports.reduce((s, i) => s + i.value, 0);

            const portalData = {
                table31: {
                    a: { label: "Outward Taxable Supplies", val: gstr1Data.totalTaxable - exportValue, tax: gstr1Data.totalGst },
                    b: { label: "Outward Taxable Supplies (Zero Rated)", val: exportValue, tax: 0 },
                    c: { label: "Other Outward Supplies (Nil Rated, Exempted)", val: 0, tax: 0 },
                    d: { label: "Inward Supplies liable to Reverse Charge", val: 0, tax: 0 },
                    e: { label: "Non-GST Outward Supplies", val: 0, tax: 0 }
                },
                table4: {
                    a: { label: "ITC Available (All other ITC)", val: itcTotal },
                    b: { label: "ITC Reversed", val: 0 },
                    c: { label: "Net ITC Available", val: itcTotal },
                    d: { label: "Ineligible ITC", val: 0 }
                }
            };

            return {
                outwardSupplies: {
                    taxableValue: gstr1Data.totalTaxable,
                    igst: gstr1Data.iamt,
                    cgst: gstr1Data.camt,
                    sgst: gstr1Data.samt,
                    cess: 0
                },
                itc: {
                    available: itcTotal,
                    reversed: 0
                },
                netTaxLiability: Math.max(0, gstr1Data.totalGst - itcTotal),
                portalData: portalData
            };
        },

        validateGstComplianceSync(doc) {
            const errors = [];
            const acc = doc.account || {};
            const isPurchase = doc.type === 'Purchase Invoice';
            const isExport = (doc.currency && doc.currency !== 'INR') || (acc.country && acc.country !== 'India');
            const isImport = isPurchase && acc.country !== 'India';
            const isB2B = !!acc.gstin;

            // VAL_01: Export/LUT GST Validation
            const totals = this.getDocTotals(doc, true);
            if (!isPurchase && isExport && totals.tax > 0 && doc.supplyType === 'EXPORT_LUT') {
                errors.push("VAL_01: Supply under LUT must have 0% GST.");
            }

            // VAL_02: B2B GSTIN Validation
            if (isB2B && acc.gstin.length !== 15 && acc.country === 'India') {
                errors.push("VAL_02: Indian B2B invoices require a valid 15-character GSTIN.");
            }

            // VAL_03: HSN/SAC Validation
            const missingHsn = (doc.items || []).some(item => !item.hsn || item.hsn.trim() === '');
            if (missingHsn) {
                errors.push("VAL_03: All line items must have a valid HSN/SAC code.");
            }

            // VAL_09: Import/BOE Validation
            if (isImport) {
                if (!doc.boeNumber) errors.push("VAL_09: Bill of Entry (BOE) Number is mandatory for imports.");
                if (!doc.boeDate) errors.push("VAL_10: Bill of Entry (BOE) Date is mandatory for imports.");
                if (!doc.portCode) errors.push("VAL_11: Port Code is mandatory for imports.");
            }

            return {
                valid: errors.length === 0,
                errors: errors
            };
        },

        async validateGstCompliance(doc) {
            const validation = this.validateGstComplianceSync(doc);
            const errors = [...validation.errors];
            const isPurchase = doc.type === 'Purchase Invoice';

            // VAL_00: Duplicate Invoice Check
            if ((doc.type === 'Tax Invoice' || isPurchase) && doc.number && !doc.number.includes('PREVIEW')) {
                const { data: existing } = await window.supabase
                    .from('documents')
                    .select('id')
                    .eq('number', doc.number)
                    .neq('id', doc.id) // Exclude current doc if editing
                    .maybeSingle();

                if (existing) {
                    errors.push(`VAL_00: ${isPurchase ? 'Vendor' : 'Invoice'} number ${doc.number} already exists.`);
                }
            }

            return {
                valid: errors.length === 0,
                errors: errors
            };
        },

        getGstDashboardStats() {
            // Refined stats logic
            const docs = this.savedDocs.filter(d =>
                (d.type === 'Tax Invoice' || d.type === 'Credit Note' || d.type === 'Debit Note' || d.type === 'Purchase Invoice')
            );

            let stats = {
                b2bCount: 0,
                b2cCount: 0,
                totalTaxable: 0,
                totalGst: 0,
                exportCount: 0,
                purchaseCount: 0,
                totalItc: 0
            };

            docs.forEach(doc => {
                const isPurchase = doc.type === 'Purchase Invoice';
                const isExport = (doc.currency && doc.currency !== 'INR') || (doc.account && doc.account.country && doc.account.country !== 'India');
                const isB2B = this.isB2B(doc.account);
                const totals = this.getDocTotals(doc);
                const multiplier = doc.type === 'Credit Note' ? -1 : 1;
                const exRate = doc.exchangeRate || 1;

                if (isPurchase) {
                    stats.purchaseCount++;
                    stats.totalItc += totals.tax * exRate;
                } else {
                    if (isExport) stats.exportCount++;
                    else if (isB2B) stats.b2bCount++;
                    else stats.b2cCount++;

                    stats.totalTaxable += totals.subtotal * multiplier * exRate;
                    stats.totalGst += totals.tax * multiplier * exRate;
                }
            });

            return stats;
        },

        updateComplianceHealth() {
            // Data Integrity: Check all Tax Invoices for HSN and GSTIN validity
            const criticalDocs = this.savedDocs.filter(d => d.type === 'Tax Invoice' || d.type === 'Purchase Invoice');
            if (criticalDocs.length === 0) {
                this.complianceStats.score = 100;
                this.complianceStats.dataIntegrity = 100;
                return;
            }

            let validCount = 0;
            criticalDocs.forEach(doc => {
                const validation = this.validateGstComplianceSync(doc);
                if (validation.valid) validCount++;
            });

            this.complianceStats.dataIntegrity = Math.round((validCount / criticalDocs.length) * 100);

            // Filing Punctuality: % of filings done before due date in history
            const filings = this.gstHistory || [];
            if (filings.length > 0) {
                const onTime = filings.filter(f => f.status === 'Filed' && new Date(f.filed_at) <= new Date(f.due_date)).length;
                this.complianceStats.punctuality = Math.round((onTime / filings.length) * 100);
            } else {
                this.complianceStats.punctuality = 100; // Fresh start
            }

            // ITC Efficiency: Ratio of valid purchase invoices (simulated)
            const purchases = this.savedDocs.filter(d => d.type === 'Purchase Invoice');
            const validPurchases = purchases.filter(p => this.isB2B(p.account)).length;
            this.complianceStats.itcEfficiency = purchases.length > 0 ? Math.round((validPurchases / purchases.length) * 100) : 100;

            // Final Weighted Score
            this.complianceStats.score = Math.round(
                (this.complianceStats.dataIntegrity * 0.4) +
                (this.complianceStats.punctuality * 0.3) +
                (this.complianceStats.itcEfficiency * 0.3)
            );
        },

        async calculateCMP08(quarter, year) {
            // For composition dealers - simplified calculation
            const [q] = quarter.split('-');
            const quarterNum = parseInt(q.replace('Q', ''));
            const startMonth = (quarterNum - 1) * 3 + 1;
            const endMonth = quarterNum * 3;

            const startDate = `${year}-${startMonth.toString().padStart(2, '0')}-01`;
            const endDate = `${year}-${endMonth.toString().padStart(2, '0')}-31`;

            const invoices = this.savedDocs.filter(d =>
                d.type === 'Tax Invoice' &&
                d.date >= startDate &&
                d.date <= endDate
            );

            let totalTurnover = 0;
            invoices.forEach(inv => {
                const totals = this.getDocTotals(inv);
                totalTurnover += totals.total;
            });

            const taxRate = 0.01; // 1% for composition
            const taxPayable = totalTurnover * taxRate;

            return {
                turnover: totalTurnover,
                taxRate: taxRate * 100,
                taxPayable
            };
        },


        async saveGstFiling(returnType, period, data, status = 'Pending') {
            const frequency = this.gstSettings.filingFrequency;
            const dueDate = this.calculateGstDueDate(returnType, period, frequency);

            const payload = {
                user_id: this.user?.id, // Added user_id for consistency
                return_type: returnType, // Renamed from 'type' to match existing schema
                period: period,
                status: status,
                due_date: dueDate?.toISOString().split('T')[0], // Ensure ISO string format
                filed_date: status === 'Filed' ? new Date().toISOString().split('T')[0] : null, // Renamed from 'filed_at'
                data_snapshot: data, // Immutable snapshot for audit defense
                taxable_value: data.totalTaxable || 0,
                total_gst: data.totalGst || 0,
                created_by: this.user?.id // Redundant if user_id is already there, but keeping for now
            };

            // Check if filing already exists
            const { data: existing, error: fetchError } = await window.supabase
                .from('gst_filings')
                .select('id')
                .eq('user_id', this.user?.id)
                .eq('return_type', returnType)
                .eq('period', period)
                .single();

            let error;
            if (existing) {
                // Update existing record
                const result = await window.supabase
                    .from('gst_filings')
                    .update(payload)
                    .eq('id', existing.id);
                error = result.error;
            } else {
                // Insert new record
                const result = await window.supabase
                    .from('gst_filings')
                    .insert(payload);
                error = result.error;
            }

            if (error) {
                console.error('Error saving GST filing:', error);
                this.notify('Failed to save filing: ' + error.message, 'error');
                return false;
            }

            this.notify('GST filing saved successfully!', 'success');
            await this.loadGstFilings();
            return true;
        },

        async loadGstFilings() {
            const { data, error } = await window.supabase
                .from('gst_filings')
                .select('*')
                .eq('user_id', this.user?.id)
                .order('due_date', { ascending: false });

            if (!error) {
                this.gstFilings = data || [];
            }
        },

        getFilingStatus(returnType, period) {
            const filing = this.gstFilings.find(f =>
                f.return_type === returnType && f.period === period
            );

            if (!filing) return 'Pending';

            const now = new Date();
            const dueDate = new Date(filing.due_date);

            if (filing.status === 'Filed') return 'Filed';
            if (now > dueDate) return 'Overdue';
            return 'Pending';
        },

        downloadGstReturnJSON(returnType, period, data) {
            if (!data) {
                alert('Please calculate the return first');
                return;
            }

            const filename = `${returnType}_${period}.json`;
            const jsonStr = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        },

        downloadGstReturnExcel(returnType, period, data) {
            if (!data) {
                alert('Please calculate the return first');
                return;
            }

            let csvContent = '';
            const filename = `${returnType}_${period}.csv`;

            // Helper for Indian Currency Formatting in CSV
            const f = (val) => {
                const num = Number(val) || 0;
                const formatted = num.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
                return `"${formatted}"`;
            };

            if (returnType === 'GSTR-1') {
                csvContent = 'GSTR-1 Summary\n\n';
                csvContent += `Period,${period}\n`;
                csvContent += `Total Invoices,${data.invoiceCount}\n`;
                csvContent += `Total Taxable Value,${f(data.totalTaxable)}\n`;
                csvContent += `Total GST,${f(data.totalGst)}\n\n`;

                csvContent += 'B2B Invoices\n';
                csvContent += 'Invoice No,Date,GSTIN,Account Name,PO Number,PO Date,Taxable Value,IGST,CGST,SGST,Total GST\n';
                data.b2b.forEach(inv => {
                    csvContent += `${inv.number},${inv.date},${inv.gstin},${inv.name},${inv.poNumber},${inv.poDate},${f(inv.taxable)},${f(inv.iamt)},${f(inv.camt)},${f(inv.samt)},${f(inv.gst)}\n`;
                });

                if (data.b2cl && data.b2cl.length > 0) {
                    csvContent += '\nSection 5 - B2C Large (Inter-state > 2.5L)\n';
                    csvContent += 'Invoice No,Date,Place of Supply,Rate,Taxable Value,IGST\n';
                    data.b2cl.forEach(inv => {
                        csvContent += `${inv.number},${inv.date},${inv.pos},${inv.rt}%,${f(inv.taxable)},${f(inv.gst)}\n`;
                    });
                }

                csvContent += '\nSection 7 - B2C Small (Aggregated)\n';
                csvContent += 'Place of Supply,Rate,Taxable Value,IGST,CGST,SGST,Total GST\n';
                data.b2cs.forEach(row => {
                    const totalGst = (row.iamt || 0) + (row.camt || 0) + (row.samt || 0);
                    csvContent += `${row.pos},${row.rt}%,${f(row.txval)},${f(row.iamt)},${f(row.camt)},${f(row.samt)},${f(totalGst)}\n`;
                });

                if (data.exports && data.exports.length > 0) {
                    csvContent += '\nSection 6A - Exports / LUT\n';
                    csvContent += 'Invoice No,Date,Value,Type,Shipping Bill,Shipping Date\n';
                    data.exports.forEach(exp => {
                        csvContent += `${exp.number},${exp.date},${f(exp.value)},${exp.type},${exp.shippingBill},${exp.shippingDate}\n`;
                    });
                }

                if (data.hsnSummary) {
                    csvContent += '\nSection 12 - HSN Summary\n';
                    csvContent += 'HSN/SAC,Description,UQC,Quantity,Taxable Value,IGST,CGST,SGST,Total GST\n';
                    data.hsnSummary.forEach(h => {
                        const totalGst = (h.iamt || 0) + (h.camt || 0) + (h.samt || 0);
                        csvContent += `${h.hsn},Service/Product,${h.uqc},${h.qty},${f(h.txval)},${f(h.iamt)},${f(h.camt)},${f(h.samt)},${f(totalGst)}\n`;
                    });
                }
            } else if (returnType === 'GSTR-3B') {
                csvContent = 'GSTR-3B Summary\n\n';
                csvContent += `Period,${period}\n`;
                csvContent += `Taxable Value,${f(data.outwardSupplies.taxableValue)}\n`;
                csvContent += `IGST,${f(data.outwardSupplies.igst)}\n`;
                csvContent += `CGST,${f(data.outwardSupplies.cgst)}\n`;
                csvContent += `SGST,${f(data.outwardSupplies.sgst)}\n`;
                csvContent += `Net Tax Liability,${f(data.netTaxLiability)}\n`;
            } else if (returnType === 'CMP-08') {
                csvContent = 'CMP-08 Summary\n\n';
                csvContent += `Period,${period}\n`;
                csvContent += `Turnover,${f(data.turnover)}\n`;
                csvContent += `Tax Rate,${data.taxRate}%\n`;
                csvContent += `Tax Payable,${f(data.taxPayable)}\n`;
            }

            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        }
    }
}
